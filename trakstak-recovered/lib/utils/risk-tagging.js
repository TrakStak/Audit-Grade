import { callClaude } from "../claudeClient.js";
import { supabase } from '../supabase.js'

export async function tagRisk({ type, record }) {
  const input = `Evaluate the following ${type} log and return a JSON with risk_level (low/med/high) and flag_reason:\n\n${record.details || record.text || record.notes}`;
  
  try {
    const suggestion = await callClaude(input);
    if (!suggestion) return;

    let parsed;
    try {
      parsed = JSON.parse(suggestion);
    } catch {
      parsed = { risk_level: "low", flag_reason: "Could not parse AI response" };
    }

    const { id, organization_id, created_by } = record;
    const { data: aiRow } = await supabase.from("ai_suggestions").insert({
      organization_id,
      type: `${type}_risk_tag`,
      input,
      suggestion,
      was_ai_assisted: true,
      created_by
    }).select().single();

    const update = {
      risk_level: parsed.risk_level,
      flag_reason: parsed.flag_reason,
      linked_ai_suggestion_id: aiRow?.id
    };

    await supabase.from(`${type}_logs`).update(update).eq("id", id);
  } catch (error) {
    console.error('Risk tagging error:', error);
  }
}
