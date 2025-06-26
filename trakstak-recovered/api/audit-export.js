import { createClient } from '@supabase/supabase-js';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { 
      export_type, 
      table_name, 
      record_ids, 
      export_reason,
      user_id,
      org_id 
    } = req.body;

    // Role-gated access check
    const { data: userRole } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user_id)
      .single();

    if (!['admin', 'auditor', 'manager'].includes(userRole?.role)) {
      return res.status(403).json({ error: 'Insufficient permissions for export' });
    }

    // Get organization data
    const { data: orgData } = await supabase
      .from('organizations')
      .select('name, abn')
      .eq('id', org_id)
      .single();

    // Get user data
    const { data: userData } = await supabase
      .from('user_profiles')
      .select('first_name, last_name, email')
      .eq('id', user_id)
      .single();

    // Get export data based on table and IDs
    const { data: exportData } = await supabase
      .from(table_name)
      .select('*')
      .in('id', record_ids);

    // Create PDF with audit-grade metadata
    const doc = new jsPDF();
    const timestamp = new Date().toISOString();
    const exportHash = crypto.createHash('sha256')
      .update(JSON.stringify(exportData) + timestamp)
      .digest('hex');

    // PDF Header with TrakStak branding
    doc.setFontSize(20);
    doc.text('TrakStak Audit Export', 20, 20);
    
    doc.setFontSize(12);
    doc.text('🔐 Audit-Grade Compliance Export', 20, 35);

    // Metadata section
    const metadata = [
      ['Export Type', export_type],
      ['Table', table_name],
      ['Exported By', `${userData.first_name} ${userData.last_name} (${userData.email})`],
      ['Organization', `${orgData.name} (ABN: ${orgData.abn})`],
      ['Export Date/Time', new Date(timestamp).toLocaleString()],
      ['Export Reason', export_reason],
      ['Record Count', exportData.length.toString()],
      ['Tamper Hash', exportHash.substring(0, 16) + '...'],
      ['User Role', userRole.role],
      ['Org ID (Internal)', org_id]
    ];

    doc.autoTable({
      startY: 45,
      head: [['Field', 'Value']],
      body: metadata,
      theme: 'grid',
      styles: { fontSize: 10 }
    });

    // Data section
    if (exportData.length > 0) {
      const columns = Object.keys(exportData[0]).filter(key => 
        !['id', 'organization_id'].includes(key)
      );
      
      const tableData = exportData.map(row => 
        columns.map(col => {
          let value = row[col];
          if (typeof value === 'object') value = JSON.stringify(value);
          if (typeof value === 'boolean') value = value ? '✓' : '✗';
          return value || '-';
        })
      );

      doc.autoTable({
        head: [columns],
        body: tableData,
        theme: 'striped',
        styles: { fontSize: 8 },
        columnStyles: { 0: { cellWidth: 'auto' } }
      });
    }

    // Legal footer
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.text('Legal Export Footer:', 20, pageHeight - 40);
    doc.text(`Exported by: ${userData.first_name} ${userData.last_name}`, 20, pageHeight - 30);
    doc.text(`Date/Time: ${new Date(timestamp).toLocaleString()} UTC`, 20, pageHeight - 20);
    doc.text(`Organization: ${orgData.name}`, 20, pageHeight - 10);
    doc.text('Signature: _________________________', 120, pageHeight - 10);

    // Log the export
    await supabase.from('audit_logs').insert({
      user_id,
      organization_id: org_id,
      action: 'export_generated',
      metadata: {
        export_type,
        table_name,
        record_count: exportData.length,
        export_hash: exportHash,
        export_reason,
        user_role: userRole.role,
        ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress
      }
    });

    // Return PDF as base64
    const pdfBuffer = doc.output('arraybuffer');
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64');

    res.status(200).json({
      success: true,
      export_hash: exportHash,
      export_id: `exp_${Date.now()}`,
      pdf_base64: pdfBase64,
      metadata: {
        exported_by: `${userData.first_name} ${userData.last_name}`,
        export_timestamp: timestamp,
        record_count: exportData.length,
        organization: orgData.name
      }
    });

  } catch (error) {
    console.error('Audit export error:', error);
    res.status(500).json({ error: 'Export generation failed' });
  }
}
