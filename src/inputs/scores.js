import { uniqBy } from 'lodash';

export const questions = [
  {
    id: 0,
    text: 'The source of the attribution does not have a direct financial interest in a certain attribution outcome.',
    column: 'attribution_financial_incentive',
    score: 'attributionCredibilityScore',
    scoreName: 'Credibility'
  },
  {
    id: 1,
    text: 'The source of the attribution has a diversified and transparent funding stream.',
    column: 'attribution_financial_transparency',
    score: 'attributionCredibilityScore',
    scoreName: 'Credibility'
  },
  {
    id: 2,
    text: 'The source of the attribution does not strongly endorse a specific political ideology.',
    column: 'attribution_endorse_political',
    score: 'attributionCredibilityScore',
    scoreName: 'Credibility'
  },
  {
    id: 3,
    text: 'The source of the attribution is in no way affiliated with a political campaign.',
    column: 'attribution_campaign_affiliation',
    score: 'attributionCredibilityScore',
    scoreName: 'Credibility'
  },
  {
    id: 4,
    text: 'The source of the attribution has not previously promoted mis- or disinformation.',
    column: 'attribution_published_mis_disinfo',
    score: 'attributionCredibilityScore',
    scoreName: 'Credibility'
  },
  {
    id: 5,
    text: 'The attribution avoids using biased wording. The attribution avoids high-inference or emotive language.',
    column: 'attribution_language',
    score: 'attributionObjectivityScore',
    scoreName: 'Objectivity'
  },
  {
    id: 6,
    text: 'The headline accurately conveys the content of the attribution.',
    column: 'attribution_convey_content',
    score: 'attributionObjectivityScore',
    scoreName: 'Objectivity'
  },
  {
    id: 7,
    text: 'The attribution clearly distinguishes factual information from argumentative analysis.',
    column: 'attribution_factual_argument',
    score: 'attributionObjectivityScore',
    scoreName: 'Objectivity'
  },
  {
    id: 8,
    text: 'The attribution provides a clear illustration of the methodology, tactics, and platforms involved in the alleged information operation.',
    column: 'attribution_clarity',
    score: 'attributionEvidenceScore',
    scoreName: 'Evidence'
  },
  {
    id: 9,
    text: 'The attribution contextualizes the engagement with, and impact of, the alleged information operation.',
    column: 'attribution_context',
    score: 'attributionEvidenceScore',
    scoreName: 'Evidence'
  },
  {
    id: 10,
    text: 'The attribution identifies actors and states allegedly responsible.',
    column: 'attribution_identified_responsibility',
    score: 'attributionEvidenceScore',
    scoreName: 'Evidence'
  },
  {
    id: 11,
    text: 'The attribution clearly explains the strategic goal and rationale of the actors who conducted the alleged information operation.',
    column: 'attribution_strategic_rationale',
    score: 'attributionEvidenceScore',
    scoreName: 'Evidence'
  },
  {
    id: 12,
    text: 'The attribution relies on information which is unique to, or can only be procured by, the relevant actor. (e.g. classified information for U.S. federal agencies, back-end/developer information for technology companies)',
    column: 'attribution_privileged_evidence',
    score: 'attributionEvidenceScore',
    scoreName: 'Evidence'
  },
  {
    id: 13,
    text: 'The attribution provides open access to a dataset or archived links of alleged assets.',
    column: 'attribution_open_access',
    score: 'attributionTransparencyScore',
    scoreName: 'Transparency'
  },
  {
    id: 14,
    text: 'The attribution methodology is clearly explained.',
    column: 'attribution_methodology',
    score: 'attributionTransparencyScore',
    scoreName: 'Transparency'
  },
  {
    id: 15,
    text: 'The attribution is replicable through open-source evidence.',
    column: 'attribution_open_source',
    score: 'attributionTransparencyScore',
    scoreName: 'Transparency'
  },
  {
    id: 16,
    text: 'The attribution acknowledges relevant limitations or mitigating factors in its assessment.',
    column: 'attribution_acknowledge_limitations',
    score: 'attributionTransparencyScore',
    scoreName: 'Transparency'
  },
  {
    id: 17,
    text: 'The attribution has been corroborated by a third party or independent investigation.',
    column: 'attribution_corroboration',
    score: 'attributionTransparencyScore',
    scoreName: 'Transparency'
  }
];

export const scores = uniqBy(questions.map((d) => ({score: d.score, scoreName: d.scoreName})), 'score');

export const maxScores = (() => {
  let res = {};
  scores.forEach((s) => {
    res = {...res, [s.score]: questions.filter((d) => d.score === s.score).length};
  });
  return(res);
})();
