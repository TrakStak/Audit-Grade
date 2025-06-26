export const enforceRLS = (query, user, organization_id) => {
  if (!user || !organization_id) {
    throw new Error('Authentication required');
  }
  
  // Add organization_id filter to all queries
  return query.eq('organization_id', organization_id);
};

export const validateUserRole = (userRole, requiredRole) => {
  const roleHierarchy = {
    'admin': 4,
    'manager': 3,
    'auditor': 3, 
    'staff': 2,
    'user': 1
  };
  
  const userLevel = roleHierarchy[userRole] || 0;
  const requiredLevel = roleHierarchy[requiredRole] || 0;
  
  return userLevel >= requiredLevel;
};

export const logSecurityEvent = async (supabase, event) => {
  return supabase.from('audit_logs').insert({
    action_type: 'security_event',
    table_name: 'security_logs',
    organization_id: event.organization_id,
    created_by: event.user_id,
    was_ai_assisted: false,
    details: `Security event: ${event.type} - ${event.details}`
  });
};

export const auditGradeValidation = (data) => {
  const required = [
    'organization_id',
    'created_by', 
    'created_at',
    'was_ai_assisted'
  ];
  
  const missing = required.filter(field => !data[field]);
  
  if (missing.length > 0) {
    throw new Error(`Audit-grade validation failed. Missing: ${missing.join(', ')}`);
  }
  
  return true;
};
