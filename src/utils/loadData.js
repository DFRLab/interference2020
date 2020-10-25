import { csv, timeParse } from 'd3';
import { splitString, cleanCountries } from './misc';
import { data as dataPath } from '../inputs/dataPaths';

const parseTimestamp = timeParse('%m/%d/%Y %H:%M:%S %Z');
const parseDate = timeParse('%m/%d/%Y');

const loadData = async () => {
  const data = await csv(dataPath, (d, i) => {

    const smiTotal = d.total_engagement === '' ? Number.NaN : +d.total_engagement;
    const smiPending = isNaN(smiTotal);
    const source = d.source_for_display !== '' ? d.source_for_display : d.source;

    return {
      id: i,
      timestamp: parseTimestamp([d.timestamp, '-0400'].join(' ')),
      caseHash: d.case_hash,
      caseId: d.case_id,
      source: splitString(source),
      sourceFilter: splitString(d.source_subcategory !== '' ? d.source_subcategory : source),
      sourceSubcategory: splitString(d.source_subcategory),
      sourceCategory: splitString(d.source_category),
      sourceNation: d.source_nation,
      disinformant: d.disinformant,
      disinformantNation: cleanCountries(splitString(d.disinformant_nation)),
      disinformantAttribution: d.disinformant_attribution,
      shortTitle: d.short_title,
      shortDescription: d.short_description,
      attributionUrl: d.attribution_url,
      attributionArchiveUrl: d.archived_attribution_url,
      imageUrl: d.image_url,
      imageCredit: d.image_credit,
      openWeb: d.open_web,
      socialMedia: d.social_media,
      messagingPlatforms: d.messaging_platforms,
      other: d.other,
      platforms: splitString([d.social_media, d.messaging_platforms].join(',')),
      startDate: parseDate(d.start_date),
      endDate: parseDate(d.end_date),
      attributionDate: parseDate(d.attribution_date),
      methods: splitString(d.methods),
      smiTotal,
      smiFacebook: d.facebook_engagement === '' ? Number.NaN : +d.facebook_engagement,
      smiTwitter: d.twitter_engagement === '' ? Number.NaN : +d.twitter_engagement,
      smiReddit: d.reddit_engagement === '' ? Number.NaN : +d.reddit_engagement,
      smiFacebookShare: ((+d.facebook_engagement) / smiTotal) || 0,
      smiTwitterShare: ((+d.twitter_engagement) / smiTotal) || 0,
      smiRedditShare: ((+d.reddit_engagement) / smiTotal) || 0,
      smiPending,
      attributionScore: +d.attribution_total_score,
      attributionCredibilityScore: +d.attribution_credibility_score,
      attributionObjectivityScore: +d.attribution_objectivity_score,
      attributionEvidenceScore: +d.attribution_evidence_score,
      attributionTransparencyScore: +d.attribution_transparency_score,
      attribution_financial_incentive: +d.attribution_financial_incentive,
      attribution_financial_transparency: +d.attribution_financial_transparency,
      attribution_endorse_political: +d.attribution_endorse_political,
      attribution_campaign_affiliation: +d.attribution_campaign_affiliation,
      attribution_published_mis_disinfo: +d.attribution_published_mis_disinfo,
      attribution_language: +d.attribution_language,
      attribution_convey_content: +d.attribution_convey_content,
      attribution_factual_argument: +d.attribution_factual_argument,
      attribution_clarity: +d.attribution_clarity,
      attribution_context: +d.attribution_context,
      attribution_identified_responsibility: +d.attribution_identified_responsibility,
      attribution_strategic_rationale: +d.attribution_strategic_rationale,
      attribution_privileged_evidence: +d.attribution_privileged_evidence,
      attribution_open_access: +d.attribution_open_access,
      attribution_methodology: +d.attribution_methodology,
      attribution_open_source: +d.attribution_open_source,
      attribution_acknowledge_limitations: +d.attribution_acknowledge_limitations,
      attribution_corroboration: +d.attribution_corroboration,
      tags: splitString(d.tags)
    };
  });

  return(data.filter((d) => d.timestamp !== null));
};

export default loadData;
