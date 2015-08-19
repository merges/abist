/** @jsx React.DOM */

var React = require('react/addons');
var _ = require('underscore');

var medications = require('./Data.jsx');

var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var Sticky = require('react-sticky');

var AbsoluteFrequency = require('./visualizations/AbsoluteFrequency.jsx');
var Difference = require('./visualizations/Difference.jsx');
var GradeQuality = require('./visualizations/GradeQuality.jsx');
var Intervention = require('./visualizations/Intervention.jsx');
var Population = require('./visualizations/Population.jsx');
var RelativeRiskComparison = require('./visualizations/RelativeRiskComparison.jsx');
var RiskRelativeToBaseline = require('./visualizations/RiskRelativeToBaseline.jsx');
var Source = require('./visualizations/Source.jsx');

// Outcome timeline test

String.prototype.capitalizeFirstletter = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

var getNumber = function(value) {
  if (!isNaN(parseFloat(value))) {
    return parseFloat(value);
  }
  return null;
};

var mockData      = {"version":"1.0","encoding":"UTF-8","feed":{"xmlns":"http://www.w3.org/2005/Atom","xmlns$openSearch":"http://a9.com/-/spec/opensearchrss/1.0/","xmlns$gsx":"http://schemas.google.com/spreadsheets/2006/extended","id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"FIN-RACo"},"link":[{"rel":"alternate","type":"application/atom+xml","href":"https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/pubhtml"},{"rel":"http://schemas.google.com/g/2005#feed","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values"},{"rel":"http://schemas.google.com/g/2005#post","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values"},{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values?alt=json"}],"author":[{"name":{"$t":"adamibaker"},"email":{"$t":"adamibaker@gmail.com"}}],"openSearch$totalResults":{"$t":"41"},"openSearch$startIndex":{"$t":"1"},"entry":[{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cokwr"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"key"},"content":{"type":"text","$t":"measure: i.e. outcome, metric: i.e. statistic, valuecilow: 95% ci low, valuecihigh: 95% ci high, valuesd: standard deviation, valueiqrlow: interquartile range, valueiqrhigh: interquartile range, grade: GRADE quality, ntotal: number of participants, durationlow: low end of duration or follow-up, durationhigh: high end of duration or follow-up, population: population / characteristic, intervention: intervention(s)\ncomma-separated, comparison: comparison(s),\ncomma-separated, dosageform: comma-separated, dosageinterval: once | prn | hour | day | week | month | year, notes: notes"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cokwr"}],"gsx$which":{"$t":"key"},"gsx$measure":{"$t":"i.e. outcome"},"gsx$metric":{"$t":"i.e. statistic"},"gsx$value":{"$t":""},"gsx$valuecilow":{"$t":"95% ci low"},"gsx$valuecihigh":{"$t":"95% ci high"},"gsx$valuesd":{"$t":"standard deviation"},"gsx$valueiqrlow":{"$t":"interquartile range"},"gsx$valueiqrhigh":{"$t":"interquartile range"},"gsx$grade":{"$t":"GRADE quality"},"gsx$ntotal":{"$t":"number of participants"},"gsx$durationlow":{"$t":"low end of duration or follow-up"},"gsx$durationhigh":{"$t":"high end of duration or follow-up"},"gsx$durationinterval":{"$t":""},"gsx$population":{"$t":"population / characteristic"},"gsx$intervention":{"$t":"intervention(s)\ncomma-separated"},"gsx$comparison":{"$t":"comparison(s),\ncomma-separated"},"gsx$dosage":{"$t":""},"gsx$dosageform":{"$t":"comma-separated"},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":"once | prn | hour | day | week | month | year"},"gsx$source":{"$t":""},"gsx$notes":{"$t":"notes"},"gsx$kind":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cpzh4"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"intervention"},"content":{"type":"text","$t":"measure: remission, metric: percentage, value: 0.26, ntotal: 78, durationlow: 6, durationinterval: month, population: Remission after 6 months of treatment, intervention: methotrexate,sulfasalazine,hydroxychloroquine,prednisolone, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cpzh4"}],"gsx$which":{"$t":"intervention"},"gsx$measure":{"$t":"remission"},"gsx$metric":{"$t":"percentage"},"gsx$value":{"$t":"0.26"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"78"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"Remission after 6 months of treatment"},"gsx$intervention":{"$t":"methotrexate,sulfasalazine,hydroxychloroquine,prednisolone"},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":""},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cre1l"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"intervention"},"content":{"type":"text","$t":"measure: remission, metric: percentage, value: 0.11, ntotal: 81, durationlow: 6, durationinterval: month, population: Remission after 6 months of treatment, intervention: sulfasalazine,prednisolone (optional),switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cre1l"}],"gsx$which":{"$t":"intervention"},"gsx$measure":{"$t":"remission"},"gsx$metric":{"$t":"percentage"},"gsx$value":{"$t":"0.11"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"81"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"Remission after 6 months of treatment"},"gsx$intervention":{"$t":"sulfasalazine,prednisolone (optional),switch to methotrexate if inadequate response on sulfasalazine"},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":""},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/chk2m"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"intervention"},"content":{"type":"text","$t":"measure: acr_50, metric: percentage, value: 0.42, ntotal: 78, durationlow: 6, durationinterval: month, population: ACR 50 after 6 months of treatment, intervention: methotrexate,sulfasalazine,hydroxychloroquine,prednisolone, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/chk2m"}],"gsx$which":{"$t":"intervention"},"gsx$measure":{"$t":"acr_50"},"gsx$metric":{"$t":"percentage"},"gsx$value":{"$t":"0.42"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"78"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"ACR 50 after 6 months of treatment"},"gsx$intervention":{"$t":"methotrexate,sulfasalazine,hydroxychloroquine,prednisolone"},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":""},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/ciyn3"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"intervention"},"content":{"type":"text","$t":"measure: acr_50, metric: percentage, value: 0.41, ntotal: 81, durationlow: 6, durationinterval: month, population: ACR 50 after 6 months of treatment, intervention: sulfasalazine,prednisolone (optional),switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/ciyn3"}],"gsx$which":{"$t":"intervention"},"gsx$measure":{"$t":"acr_50"},"gsx$metric":{"$t":"percentage"},"gsx$value":{"$t":"0.41"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"81"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"ACR 50 after 6 months of treatment"},"gsx$intervention":{"$t":"sulfasalazine,prednisolone (optional),switch to methotrexate if inadequate response on sulfasalazine"},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":""},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/ckd7g"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"intervention"},"content":{"type":"text","$t":"measure: arc_20, metric: percentage, value: 0.12, ntotal: 78, durationlow: 6, durationinterval: month, population: ACR 20 after 6 months of treatment, intervention: methotrexate,sulfasalazine,hydroxychloroquine,prednisolone, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/ckd7g"}],"gsx$which":{"$t":"intervention"},"gsx$measure":{"$t":"arc_20"},"gsx$metric":{"$t":"percentage"},"gsx$value":{"$t":"0.12"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"78"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":"methotrexate,sulfasalazine,hydroxychloroquine,prednisolone"},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":""},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/clrrx"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"intervention"},"content":{"type":"text","$t":"measure: acr_20, metric: percentage, value: 0.25, ntotal: 81, durationlow: 6, durationinterval: month, population: ACR 20 after 6 months of treatment, intervention: sulfasalazine,prednisolone (optional),switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/clrrx"}],"gsx$which":{"$t":"intervention"},"gsx$measure":{"$t":"acr_20"},"gsx$metric":{"$t":"percentage"},"gsx$value":{"$t":"0.25"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"81"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":"sulfasalazine,prednisolone (optional),switch to methotrexate if inadequate response on sulfasalazine"},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":""},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cyevm"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"intervention"},"content":{"type":"text","$t":"measure: sub_acr_20, metric: percentage, value: 0.21, ntotal: 78, durationlow: 6, durationinterval: month, population: Less than ACR 20 after 6 months of treatment, intervention: methotrexate,sulfasalazine,hydroxychloroquine,prednisolone, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cyevm"}],"gsx$which":{"$t":"intervention"},"gsx$measure":{"$t":"sub_acr_20"},"gsx$metric":{"$t":"percentage"},"gsx$value":{"$t":"0.21"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"78"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"Less than ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":"methotrexate,sulfasalazine,hydroxychloroquine,prednisolone"},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":""},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cztg3"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"intervention"},"content":{"type":"text","$t":"measure: sub_acr_20, metric: percentage, value: 0.23, ntotal: 81, durationlow: 6, durationinterval: month, population: Less than ACR 20 after 6 months of treatment, intervention: sulfasalazine,prednisolone (optional),switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cztg3"}],"gsx$which":{"$t":"intervention"},"gsx$measure":{"$t":"sub_acr_20"},"gsx$metric":{"$t":"percentage"},"gsx$value":{"$t":"0.23"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"81"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"Less than ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":"sulfasalazine,prednisolone (optional),switch to methotrexate if inadequate response on sulfasalazine"},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":""},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/d180g"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: patient_global_das, metric: mean_score_100, value: 4, valuesd: 5, ntotal: 29, durationlow: 6, durationinterval: month, population: Remission after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/d180g"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"patient_global_das"},"gsx$metric":{"$t":"mean_score_100"},"gsx$value":{"$t":"4"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"5"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"29"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"Remission after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/d2mkx"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: patient_global_das, metric: mean_score_100, value: 16, valuesd: 14, ntotal: 66, durationlow: 6, durationinterval: month, population: ACR 50 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/d2mkx"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"patient_global_das"},"gsx$metric":{"$t":"mean_score_100"},"gsx$value":{"$t":"16"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"14"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"66"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"ACR 50 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cssly"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: patient_global_das, metric: mean_score_100, value: 31, valuesd: 19, ntotal: 29, durationlow: 6, durationinterval: month, population: ACR 20 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cssly"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"patient_global_das"},"gsx$metric":{"$t":"mean_score_100"},"gsx$value":{"$t":"31"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"19"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"29"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cu76f"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: patient_global_das, metric: mean_score_100, value: 47, valuesd: 43, ntotal: 35, durationlow: 6, durationinterval: month, population: Less than ACR 20 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cu76f"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"patient_global_das"},"gsx$metric":{"$t":"mean_score_100"},"gsx$value":{"$t":"47"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"43"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"35"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"Less than ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cvlqs"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: physician_global_das, metric: mean_score_100, value: 1, valuesd: 4, ntotal: 29, durationlow: 6, durationinterval: month, population: Remission after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cvlqs"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"physician_global_das"},"gsx$metric":{"$t":"mean_score_100"},"gsx$value":{"$t":"1"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"4"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"29"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"Remission after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cx0b9"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: physician_global_das, metric: mean_score_100, value: 11, valuesd: 8, ntotal: 66, durationlow: 6, durationinterval: month, population: ACR 50 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/cx0b9"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"physician_global_das"},"gsx$metric":{"$t":"mean_score_100"},"gsx$value":{"$t":"11"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"8"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"66"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"ACR 50 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/d9ney"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: physician_global_das, metric: mean_score_100, value: 28, valuesd: 14, ntotal: 29, durationlow: 6, durationinterval: month, population: ACR 20 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/d9ney"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"physician_global_das"},"gsx$metric":{"$t":"mean_score_100"},"gsx$value":{"$t":"28"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"14"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"29"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/db1zf"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: physician_global_das, metric: mean_score_100, value: 38, valuesd: 19, ntotal: 35, durationlow: 6, durationinterval: month, population: Less than ACR 20 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/db1zf"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"physician_global_das"},"gsx$metric":{"$t":"mean_score_100"},"gsx$value":{"$t":"38"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"19"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"35"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"Less than ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dcgjs"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: pain, metric: mean_score_100, value: 3, valuesd: 5, ntotal: 29, durationlow: 6, durationinterval: month, population: Remission after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dcgjs"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"pain"},"gsx$metric":{"$t":"mean_score_100"},"gsx$value":{"$t":"3"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"5"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"29"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"Remission after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/ddv49"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: pain, metric: mean_score_100, value: 15, valuesd: 15, ntotal: 66, durationlow: 6, durationinterval: month, population: ACR 50 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/ddv49"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"pain"},"gsx$metric":{"$t":"mean_score_100"},"gsx$value":{"$t":"15"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"15"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"66"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"ACR 50 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/d415a"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: pain, metric: mean_score_100, value: 27, valuesd: 17, ntotal: 29, durationlow: 6, durationinterval: month, population: ACR 20 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/d415a"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"pain"},"gsx$metric":{"$t":"mean_score_100"},"gsx$value":{"$t":"27"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"17"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"29"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/d5fpr"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: pain, metric: mean_score_100, value: 40, valuesd: 23, ntotal: 35, durationlow: 6, durationinterval: month, population: Less than ACR 20 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/d5fpr"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"pain"},"gsx$metric":{"$t":"mean_score_100"},"gsx$value":{"$t":"40"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"23"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"35"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"Less than ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/d6ua4"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: haq, metric: mean_score, value: 0.0, valuesd: 0.2, ntotal: 29, durationlow: 6, durationinterval: month, population: Remission after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/d6ua4"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"haq"},"gsx$metric":{"$t":"mean_score"},"gsx$value":{"$t":"0.0"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"0.2"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"29"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"Remission after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/d88ul"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: haq, metric: mean_score, value: 0.2, valuesd: 0.3, ntotal: 66, durationlow: 6, durationinterval: month, population: ACR 50 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/d88ul"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"haq"},"gsx$metric":{"$t":"mean_score"},"gsx$value":{"$t":"0.2"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"0.3"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"66"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"ACR 50 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dkvya"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: haq, metric: mean_score, value: 0.4, valuesd: 0.4, ntotal: 29, durationlow: 6, durationinterval: month, population: ACR 20 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dkvya"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"haq"},"gsx$metric":{"$t":"mean_score"},"gsx$value":{"$t":"0.4"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"0.4"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"29"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dmair"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: haq, metric: mean_score, value: 0.6, valuesd: 0.5, ntotal: 35, durationlow: 6, durationinterval: month, population: Less than ACR 20 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dmair"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"haq"},"gsx$metric":{"$t":"mean_score"},"gsx$value":{"$t":"0.6"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"0.5"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"35"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"Less than ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dnp34"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: tjc, metric: mean_score, value: 0, ntotal: 29, durationlow: 6, durationinterval: month, population: Remission after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dnp34"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"tjc"},"gsx$metric":{"$t":"mean_score"},"gsx$value":{"$t":"0"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"29"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"Remission after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dp3nl"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: tjc, metric: mean_score, value: 4, valuesd: 2, ntotal: 66, durationlow: 6, durationinterval: month, population: ACR 50 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dp3nl"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"tjc"},"gsx$metric":{"$t":"mean_score"},"gsx$value":{"$t":"4"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"2"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"66"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"ACR 50 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/df9om"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: tjc, metric: mean_score, value: 10, valuesd: 5, ntotal: 29, durationlow: 6, durationinterval: month, population: ACR 20 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/df9om"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"tjc"},"gsx$metric":{"$t":"mean_score"},"gsx$value":{"$t":"10"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"5"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"29"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dgo93"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: tjc, metric: mean_score, value: 15, valuesd: 7, ntotal: 35, durationlow: 6, durationinterval: month, population: Less than ACR 20 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dgo93"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"tjc"},"gsx$metric":{"$t":"mean_score"},"gsx$value":{"$t":"15"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"7"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"35"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"Less than ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/di2tg"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: sjc, metric: mean_score, value: 0, ntotal: 29, durationlow: 6, durationinterval: month, population: Remission after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/di2tg"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"sjc"},"gsx$metric":{"$t":"mean_score"},"gsx$value":{"$t":"0"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"29"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"Remission after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/djhdx"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: sjc, metric: mean_score, value: 2, valuesd: 2, ntotal: 66, durationlow: 6, durationinterval: month, population: ACR 50 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/djhdx"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"sjc"},"gsx$metric":{"$t":"mean_score"},"gsx$value":{"$t":"2"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"2"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"66"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"ACR 50 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dw4je"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: sjc, metric: mean_score, value: 5, valuesd: 5, ntotal: 29, durationlow: 6, durationinterval: month, population: ACR 20 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dw4je"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"sjc"},"gsx$metric":{"$t":"mean_score"},"gsx$value":{"$t":"5"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"5"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"29"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dxj3v"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: sjc, metric: mean_score, value: 8, valuesd: 7, ntotal: 35, durationlow: 6, durationinterval: month, population: Less than ACR 20 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dxj3v"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"sjc"},"gsx$metric":{"$t":"mean_score"},"gsx$value":{"$t":"8"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":"7"},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"35"},"gsx$durationlow":{"$t":"6"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"month"},"gsx$population":{"$t":"Less than ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dyxo8"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: permanent_work_disability, metric: percentage, value: 0, ntotal: 29, durationlow: 5, durationinterval: year, population: Remission after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dyxo8"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"permanent_work_disability"},"gsx$metric":{"$t":"percentage"},"gsx$value":{"$t":"0"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"29"},"gsx$durationlow":{"$t":"5"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"year"},"gsx$population":{"$t":"Remission after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/e0c8p"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: permanent_work_disability, metric: percentage, value: 0.23, ntotal: 66, durationlow: 5, durationinterval: year, population: ACR 50 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/e0c8p"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"permanent_work_disability"},"gsx$metric":{"$t":"percentage"},"gsx$value":{"$t":"0.23"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"66"},"gsx$durationlow":{"$t":"5"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"year"},"gsx$population":{"$t":"ACR 50 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dqi9q"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: permanent_work_disability, metric: percentage, value: 0.21, ntotal: 29, durationlow: 5, durationinterval: year, population: ACR 20 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dqi9q"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"permanent_work_disability"},"gsx$metric":{"$t":"percentage"},"gsx$value":{"$t":"0.21"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"29"},"gsx$durationlow":{"$t":"5"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"year"},"gsx$population":{"$t":"ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/drwu7"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: permanent_work_disability, metric: percentage, value: 0.54, ntotal: 35, durationlow: 5, durationinterval: year, population: Less than ACR 20 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/drwu7"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"permanent_work_disability"},"gsx$metric":{"$t":"percentage"},"gsx$value":{"$t":"0.54"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":""},"gsx$valueiqrhigh":{"$t":""},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"35"},"gsx$durationlow":{"$t":"5"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"year"},"gsx$population":{"$t":"Less than ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dtbek"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: median_work_disability_days, metric: count, value: 0, valueiqrlow: 0, valueiqrhigh: 3, ntotal: 29, durationlow: 5, durationinterval: year, population: Remission after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dtbek"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"median_work_disability_days"},"gsx$metric":{"$t":"count"},"gsx$value":{"$t":"0"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":"0"},"gsx$valueiqrhigh":{"$t":"3"},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"29"},"gsx$durationlow":{"$t":"5"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"year"},"gsx$population":{"$t":"Remission after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dupz1"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: median_work_disability_days, metric: count, value: 4, valueiqrlow: 0, valueiqrhigh: 131, ntotal: 66, durationlow: 5, durationinterval: year, population: ACR 50 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/dupz1"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"median_work_disability_days"},"gsx$metric":{"$t":"count"},"gsx$value":{"$t":"4"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":"0"},"gsx$valueiqrhigh":{"$t":"131"},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"66"},"gsx$durationlow":{"$t":"5"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"year"},"gsx$population":{"$t":"ACR 50 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/e7d2q"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: median_work_disability_days, metric: count, value: 15, valueiqrlow: 0, valueiqrhigh: 170, ntotal: 29, durationlow: 5, durationinterval: year, population: ACR 20 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/e7d2q"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"median_work_disability_days"},"gsx$metric":{"$t":"count"},"gsx$value":{"$t":"15"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":"0"},"gsx$valueiqrhigh":{"$t":"170"},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"29"},"gsx$durationlow":{"$t":"5"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"year"},"gsx$population":{"$t":"ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/e8rn7"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"population"},"content":{"type":"text","$t":"measure: median_work_disability_days, metric: count, value: 337, valueiqrlow: 27, valueiqrhigh: 365, ntotal: 35, durationlow: 5, durationinterval: year, population: Less than ACR 20 after 6 months of treatment, dosage: 6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine, source: http://www.ncbi.nlm.nih.gov/pubmed/15641055, kind: randomized trial"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oclozwl/public/values/e8rn7"}],"gsx$which":{"$t":"population"},"gsx$measure":{"$t":"median_work_disability_days"},"gsx$metric":{"$t":"count"},"gsx$value":{"$t":"337"},"gsx$valuecilow":{"$t":""},"gsx$valuecihigh":{"$t":""},"gsx$valuesd":{"$t":""},"gsx$valueiqrlow":{"$t":"27"},"gsx$valueiqrhigh":{"$t":"365"},"gsx$grade":{"$t":""},"gsx$ntotal":{"$t":"35"},"gsx$durationlow":{"$t":"5"},"gsx$durationhigh":{"$t":""},"gsx$durationinterval":{"$t":"year"},"gsx$population":{"$t":"Less than ACR 20 after 6 months of treatment"},"gsx$intervention":{"$t":""},"gsx$comparison":{"$t":""},"gsx$dosage":{"$t":"6 months of methotrexate + sulfasalazine + hydroxychloroquine + prednisolone OR sulfasalazine + prednisolone (optional) + switch to methotrexate if inadequate response on sulfasalazine"},"gsx$dosageform":{"$t":""},"gsx$dosagefrequency":{"$t":""},"gsx$dosagemultiple":{"$t":""},"gsx$dosageinterval":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/15641055"},"gsx$notes":{"$t":""},"gsx$kind":{"$t":"randomized trial"}}]}};
var mockGrades    = {"version":"1.0","encoding":"UTF-8","feed":{"xmlns":"http://www.w3.org/2005/Atom","xmlns$openSearch":"http://a9.com/-/spec/opensearchrss/1.0/","xmlns$gsx":"http://schemas.google.com/spreadsheets/2006/extended","id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oo3g5h2/public/values"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"GRADE"},"link":[{"rel":"alternate","type":"application/atom+xml","href":"https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/pubhtml"},{"rel":"http://schemas.google.com/g/2005#feed","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oo3g5h2/public/values"},{"rel":"http://schemas.google.com/g/2005#post","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oo3g5h2/public/values"},{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oo3g5h2/public/values?alt=json"}],"author":[{"name":{"$t":"adamibaker"},"email":{"$t":"adamibaker@gmail.com"}}],"openSearch$totalResults":{"$t":"6"},"openSearch$startIndex":{"$t":"1"},"entry":[{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oo3g5h2/public/values/cokwr"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"level of evidence"},"content":{"type":"text","$t":"namefriendly: human-friendly name, descriptionfriendly: human-friendly description, notes: notes"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oo3g5h2/public/values/cokwr"}],"gsx$grade":{"$t":"level of evidence"},"gsx$namefriendly":{"$t":"human-friendly name"},"gsx$description":{"$t":""},"gsx$descriptionfriendly":{"$t":"human-friendly description"},"gsx$source":{"$t":""},"gsx$notes":{"$t":"notes"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oo3g5h2/public/values/cpzh4"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"4"},"content":{"type":"text","$t":"namefriendly: High quality, description: Further research is very unlikely to change our confidence in the estimate of effect., descriptionfriendly: Doctors and researchers are confident in the results. They don't think that more research would change the results, and think that the studies done so far have been reliable and well-done., source: http://www.cochranelibrary.com/about/explanations-for-cochrane-summary-of-findings-sof-tables.html"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oo3g5h2/public/values/cpzh4"}],"gsx$grade":{"$t":"4"},"gsx$namefriendly":{"$t":"High quality"},"gsx$description":{"$t":"Further research is very unlikely to change our confidence in the estimate of effect."},"gsx$descriptionfriendly":{"$t":"Doctors and researchers are confident in the results. They don't think that more research would change the results, and think that the studies done so far have been reliable and well-done."},"gsx$source":{"$t":"http://www.cochranelibrary.com/about/explanations-for-cochrane-summary-of-findings-sof-tables.html"},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oo3g5h2/public/values/cre1l"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"3"},"content":{"type":"text","$t":"namefriendly: Moderate quality, description: Further research is likely to have an important impact on our confidence in the estimate of effect and may change the estimate., descriptionfriendly: Doctors and researchers aren't completely confident in the results. They think that more research might change their minds, and might even produce different results. They think that the studies done so far have been OK, but that there isn't enough data to make them completely confident., source: http://www.cochranelibrary.com/about/explanations-for-cochrane-summary-of-findings-sof-tables.html"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oo3g5h2/public/values/cre1l"}],"gsx$grade":{"$t":"3"},"gsx$namefriendly":{"$t":"Moderate quality"},"gsx$description":{"$t":"Further research is likely to have an important impact on our confidence in the estimate of effect and may change the estimate."},"gsx$descriptionfriendly":{"$t":"Doctors and researchers aren't completely confident in the results. They think that more research might change their minds, and might even produce different results. They think that the studies done so far have been OK, but that there isn't enough data to make them completely confident."},"gsx$source":{"$t":"http://www.cochranelibrary.com/about/explanations-for-cochrane-summary-of-findings-sof-tables.html"},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oo3g5h2/public/values/chk2m"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"2"},"content":{"type":"text","$t":"namefriendly: Low quality, description: Further research is very likely to have an important impact on our confidence in the estimate of effect and is likely to change the estimate., descriptionfriendly: Doctors and researchers aren't confident in the results. They think that more research would likely change their minds, and probably produce different results. The change could be positive, or negative. They think that the studies done so far weren't well-done enough to make them confident in the results., source: http://www.cochranelibrary.com/about/explanations-for-cochrane-summary-of-findings-sof-tables.html"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oo3g5h2/public/values/chk2m"}],"gsx$grade":{"$t":"2"},"gsx$namefriendly":{"$t":"Low quality"},"gsx$description":{"$t":"Further research is very likely to have an important impact on our confidence in the estimate of effect and is likely to change the estimate."},"gsx$descriptionfriendly":{"$t":"Doctors and researchers aren't confident in the results. They think that more research would likely change their minds, and probably produce different results. The change could be positive, or negative. They think that the studies done so far weren't well-done enough to make them confident in the results."},"gsx$source":{"$t":"http://www.cochranelibrary.com/about/explanations-for-cochrane-summary-of-findings-sof-tables.html"},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oo3g5h2/public/values/ciyn3"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"1"},"content":{"type":"text","$t":"namefriendly: Very low quality, description: We are very uncertain about the estimate., descriptionfriendly: Doctors and researchers don't have confidence in the results. They think the studies done so far have flaws that make the results unreliable, and that more research is needed on this topic., source: http://www.cochranelibrary.com/about/explanations-for-cochrane-summary-of-findings-sof-tables.html"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oo3g5h2/public/values/ciyn3"}],"gsx$grade":{"$t":"1"},"gsx$namefriendly":{"$t":"Very low quality"},"gsx$description":{"$t":"We are very uncertain about the estimate."},"gsx$descriptionfriendly":{"$t":"Doctors and researchers don't have confidence in the results. They think the studies done so far have flaws that make the results unreliable, and that more research is needed on this topic."},"gsx$source":{"$t":"http://www.cochranelibrary.com/about/explanations-for-cochrane-summary-of-findings-sof-tables.html"},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oo3g5h2/public/values/ckd7g"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"X"},"content":{"type":"text","$t":"namefriendly: Unknown quality, description: The evidence has not been quality-rated., descriptionfriendly: Doctors and researchers haven't quality-rated this information according to the GRADE guidelines."},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/oo3g5h2/public/values/ckd7g"}],"gsx$grade":{"$t":"X"},"gsx$namefriendly":{"$t":"Unknown quality"},"gsx$description":{"$t":"The evidence has not been quality-rated."},"gsx$descriptionfriendly":{"$t":"Doctors and researchers haven't quality-rated this information according to the GRADE guidelines."},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}}]}};
var mockMeasures  = {"version":"1.0","encoding":"UTF-8","feed":{"xmlns":"http://www.w3.org/2005/Atom","xmlns$openSearch":"http://a9.com/-/spec/opensearchrss/1.0/","xmlns$gsx":"http://schemas.google.com/spreadsheets/2006/extended","id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Measures"},"link":[{"rel":"alternate","type":"application/atom+xml","href":"https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/pubhtml"},{"rel":"http://schemas.google.com/g/2005#feed","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values"},{"rel":"http://schemas.google.com/g/2005#post","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values"},{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values?alt=json"}],"author":[{"name":{"$t":"adamibaker"},"email":{"$t":"adamibaker@gmail.com"}}],"openSearch$totalResults":{"$t":"23"},"openSearch$startIndex":{"$t":"1"},"entry":[{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cokwr"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"measure name / code"},"content":{"type":"text","$t":"namefriendly: measure name (human-readable), namelong: measure name (longer), tags: comma-separated, kind: examination, assay, questionnaire, scale, instrument NOS,count, max: max value, if applicable, relatedmeasures: comma-separated, includedmeasures: comma-separated, notes: notes"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cokwr"}],"gsx$name":{"$t":"measure name / code"},"gsx$nameshort":{"$t":""},"gsx$namefriendly":{"$t":"measure name (human-readable)"},"gsx$namelong":{"$t":"measure name (longer)"},"gsx$description":{"$t":""},"gsx$tags":{"$t":"comma-separated"},"gsx$kind":{"$t":"examination, assay, questionnaire, scale, instrument NOS,count"},"gsx$variable":{"$t":""},"gsx$max":{"$t":"max value, if applicable"},"gsx$assessor":{"$t":""},"gsx$relatedmeasures":{"$t":"comma-separated"},"gsx$includedmeasures":{"$t":"comma-separated"},"gsx$source":{"$t":""},"gsx$notes":{"$t":"notes"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cpzh4"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"tjc"},"content":{"type":"text","$t":"nameshort: TJC, namefriendly: tender joint count, namelong: ACR tender joint count, description: \"An assessment of 28 or more joints. The joint count should be done by scoring several different aspects of tenderness, as assessed by pressure and joint manipulation on physical examination. The information on various types of tenderness should then be collapsed into a single tender-versus-nontender dichotomy.\", tags: pain,function, kind: examination, variable: interval, assessor: clinician, source: http://www.ncbi.nlm.nih.gov/pubmed/7779114"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cpzh4"}],"gsx$name":{"$t":"tjc"},"gsx$nameshort":{"$t":"TJC"},"gsx$namefriendly":{"$t":"tender joint count"},"gsx$namelong":{"$t":"ACR tender joint count"},"gsx$description":{"$t":"\"An assessment of 28 or more joints. The joint count should be done by scoring several different aspects of tenderness, as assessed by pressure and joint manipulation on physical examination. The information on various types of tenderness should then be collapsed into a single tender-versus-nontender dichotomy.\""},"gsx$tags":{"$t":"pain,function"},"gsx$kind":{"$t":"examination"},"gsx$variable":{"$t":"interval"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":"clinician"},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/7779114"},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cre1l"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"sjc"},"content":{"type":"text","$t":"nameshort: SJC, namefriendly: swollen joint count, namelong: ACR swollen joint count, description: \"An assessment of 28 or more joints. Joints are classified as swollen or not swollen.\", tags: swelling,function, kind: examination, variable: interval, assessor: clinician, source: http://www.ncbi.nlm.nih.gov/pubmed/7779114"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cre1l"}],"gsx$name":{"$t":"sjc"},"gsx$nameshort":{"$t":"SJC"},"gsx$namefriendly":{"$t":"swollen joint count"},"gsx$namelong":{"$t":"ACR swollen joint count"},"gsx$description":{"$t":"\"An assessment of 28 or more joints. Joints are classified as swollen or not swollen.\""},"gsx$tags":{"$t":"swelling,function"},"gsx$kind":{"$t":"examination"},"gsx$variable":{"$t":"interval"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":"clinician"},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/7779114"},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/chk2m"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"acr_tjc"},"content":{"type":"text","$t":"nameshort: TJC, namefriendly: tender joint count, namelong: ACR tender joint count, description: \"An assessment of 28 or more joints. The joint count should be done by scoring several different aspects of tenderness, as assessed by pressure and joint manipulation on physical examination. The information on various types of tenderness should then be collapsed into a single tender-versus-nontender dichotomy.\", tags: pain,function, kind: examination, variable: interval, assessor: clinician, source: http://www.ncbi.nlm.nih.gov/pubmed/7779114"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/chk2m"}],"gsx$name":{"$t":"acr_tjc"},"gsx$nameshort":{"$t":"TJC"},"gsx$namefriendly":{"$t":"tender joint count"},"gsx$namelong":{"$t":"ACR tender joint count"},"gsx$description":{"$t":"\"An assessment of 28 or more joints. The joint count should be done by scoring several different aspects of tenderness, as assessed by pressure and joint manipulation on physical examination. The information on various types of tenderness should then be collapsed into a single tender-versus-nontender dichotomy.\""},"gsx$tags":{"$t":"pain,function"},"gsx$kind":{"$t":"examination"},"gsx$variable":{"$t":"interval"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":"clinician"},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/7779114"},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/ciyn3"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"acr_sjc"},"content":{"type":"text","$t":"nameshort: SJC, namefriendly: swollen joint count, namelong: ACR swollen joint count, description: \"An assessment of 28 or more joints. Joints are classified as swollen or not swollen.\", tags: swelling,function, kind: examination, variable: interval, assessor: clinician, source: http://www.ncbi.nlm.nih.gov/pubmed/7779114"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/ciyn3"}],"gsx$name":{"$t":"acr_sjc"},"gsx$nameshort":{"$t":"SJC"},"gsx$namefriendly":{"$t":"swollen joint count"},"gsx$namelong":{"$t":"ACR swollen joint count"},"gsx$description":{"$t":"\"An assessment of 28 or more joints. Joints are classified as swollen or not swollen.\""},"gsx$tags":{"$t":"swelling,function"},"gsx$kind":{"$t":"examination"},"gsx$variable":{"$t":"interval"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":"clinician"},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/7779114"},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/ckd7g"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"patient_pain"},"content":{"type":"text","$t":"nameshort: pain, namefriendly: patient's assessment of pain, namelong: Patient's assessment of pain, description: \"A horizontal visual analog scale (usually 10 cm) or Likert scale assessment of the patient's current level of pain.\", tags: pain, kind: scale, variable: continuous, assessor: patient, source: http://www.ncbi.nlm.nih.gov/pubmed/7779114"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/ckd7g"}],"gsx$name":{"$t":"patient_pain"},"gsx$nameshort":{"$t":"pain"},"gsx$namefriendly":{"$t":"patient's assessment of pain"},"gsx$namelong":{"$t":"Patient's assessment of pain"},"gsx$description":{"$t":"\"A horizontal visual analog scale (usually 10 cm) or Likert scale assessment of the patient's current level of pain.\""},"gsx$tags":{"$t":"pain"},"gsx$kind":{"$t":"scale"},"gsx$variable":{"$t":"continuous"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":"patient"},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/7779114"},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/clrrx"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"patient_global_das"},"content":{"type":"text","$t":"nameshort: patient global assessment, namefriendly: patient's global assessment of disease activity, namelong: Patient's global assessment of disease activity, description: \"The patient's overall assessment of how the arthritis is doing. One acceptable method for determining this is the question from the AIMS instrument: \"Considering all the ways your arthritis affects you, mark 'X' on the scale for how well you are doing.\" An anchored, horizontal, visual analog scale (usually 10 cm) should be provided. A Likert scale response is also acceptable.\", tags: well being, kind: scale, variable: continuous, assessor: patient, source: http://www.ncbi.nlm.nih.gov/pubmed/7779114"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/clrrx"}],"gsx$name":{"$t":"patient_global_das"},"gsx$nameshort":{"$t":"patient global assessment"},"gsx$namefriendly":{"$t":"patient's global assessment of disease activity"},"gsx$namelong":{"$t":"Patient's global assessment of disease activity"},"gsx$description":{"$t":"\"The patient's overall assessment of how the arthritis is doing. One acceptable method for determining this is the question from the AIMS instrument: \"Considering all the ways your arthritis affects you, mark 'X' on the scale for how well you are doing.\" An anchored, horizontal, visual analog scale (usually 10 cm) should be provided. A Likert scale response is also acceptable.\""},"gsx$tags":{"$t":"well being"},"gsx$kind":{"$t":"scale"},"gsx$variable":{"$t":"continuous"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":"patient"},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/7779114"},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cyevm"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"physician_global_das"},"content":{"type":"text","$t":"nameshort: physician global assessment, namefriendly: physician's global assessent of disease activity, namelong: Physician's global assessent of disease activity, description: \"A horizontal visual analog scale (usually 10 cm) or Likert scale measure of the physician's assessment of the patient's current disease activity.\", tags: well being, kind: scale, variable: continuous, assessor: clinician, source: http://www.ncbi.nlm.nih.gov/pubmed/7779114"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cyevm"}],"gsx$name":{"$t":"physician_global_das"},"gsx$nameshort":{"$t":"physician global assessment"},"gsx$namefriendly":{"$t":"physician's global assessent of disease activity"},"gsx$namelong":{"$t":"Physician's global assessent of disease activity"},"gsx$description":{"$t":"\"A horizontal visual analog scale (usually 10 cm) or Likert scale measure of the physician's assessment of the patient's current disease activity.\""},"gsx$tags":{"$t":"well being"},"gsx$kind":{"$t":"scale"},"gsx$variable":{"$t":"continuous"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":"clinician"},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":""},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/7779114"},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cztg3"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"patient_physical_function"},"content":{"type":"text","$t":"nameshort: physical function, namefriendly: patient's assessment of physical function, namelong: Patient's assessment of physical function, description: \"Any patient self-assessment instrument which has been validated, has reliability, has been proven in RA trials to be sensitive to change, and which measures physical function in RA patients is acceptable. Instruments which have been demonstrated to be sensitive in RA trials include the AIMS, the HAQ, the Quality (or Index) of Well Being, the MHIQ, and the MACTAR., tags: function, kind: composite, assessor: patient, includedmeasures: aims,haq,qwb,iwb,mhiq,mactar, source: http://www.ncbi.nlm.nih.gov/pubmed/7779114"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cztg3"}],"gsx$name":{"$t":"patient_physical_function"},"gsx$nameshort":{"$t":"physical function"},"gsx$namefriendly":{"$t":"patient's assessment of physical function"},"gsx$namelong":{"$t":"Patient's assessment of physical function"},"gsx$description":{"$t":"\"Any patient self-assessment instrument which has been validated, has reliability, has been proven in RA trials to be sensitive to change, and which measures physical function in RA patients is acceptable. Instruments which have been demonstrated to be sensitive in RA trials include the AIMS, the HAQ, the Quality (or Index) of Well Being, the MHIQ, and the MACTAR."},"gsx$tags":{"$t":"function"},"gsx$kind":{"$t":"composite"},"gsx$variable":{"$t":""},"gsx$max":{"$t":""},"gsx$assessor":{"$t":"patient"},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":"aims,haq,qwb,iwb,mhiq,mactar"},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/7779114"},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/d180g"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"apr"},"content":{"type":"text","$t":"nameshort: acute-phase reactant, namefriendly: acute-phase reactant value, namelong: Laboratory test, an acute-phase reactant value, description: \"A Westergren erythrocyte sedimentation rate or a C-reactive protein level.\", tags: biomarker, kind: assay, assessor: laboratory, includedmeasures: esr,crp"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/d180g"}],"gsx$name":{"$t":"apr"},"gsx$nameshort":{"$t":"acute-phase reactant"},"gsx$namefriendly":{"$t":"acute-phase reactant value"},"gsx$namelong":{"$t":"Laboratory test, an acute-phase reactant value"},"gsx$description":{"$t":"\"A Westergren erythrocyte sedimentation rate or a C-reactive protein level.\""},"gsx$tags":{"$t":"biomarker"},"gsx$kind":{"$t":"assay"},"gsx$variable":{"$t":""},"gsx$max":{"$t":""},"gsx$assessor":{"$t":"laboratory"},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":"esr,crp"},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/d2mkx"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"esr"},"content":{"type":"text","$t":"nameshort: sed rate, namefriendly: erythrocyte sedimentation rate, namelong: Laboratory test, erythrocyte sedimentation rate, description: A general laboratory test for inflammation, from any cause—including rheumatoid arthritis, infection, and even cancer, tags: biomarker, kind: assay, assessor: laboratory"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/d2mkx"}],"gsx$name":{"$t":"esr"},"gsx$nameshort":{"$t":"sed rate"},"gsx$namefriendly":{"$t":"erythrocyte sedimentation rate"},"gsx$namelong":{"$t":"Laboratory test, erythrocyte sedimentation rate"},"gsx$description":{"$t":"A general laboratory test for inflammation, from any cause—including rheumatoid arthritis, infection, and even cancer"},"gsx$tags":{"$t":"biomarker"},"gsx$kind":{"$t":"assay"},"gsx$variable":{"$t":""},"gsx$max":{"$t":""},"gsx$assessor":{"$t":"laboratory"},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":""},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cssly"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"acr_20"},"content":{"type":"text","$t":"nameshort: ACR 20, namefriendly: 20% improvement, namelong: 20% improvement in RA symptoms, description: At least a 20% improvement in tender and swollen joint counts, and in at least three of five measures of disease activity or pain., tags: improvement, kind: composite, variable: dichotomous, includedmeasures: acr_tjc,acr_sjc,patient_pain,patient_global_das,physician_global_das,patient_physical_function,apr, source: http://www.ncbi.nlm.nih.gov/pubmed/16273794"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cssly"}],"gsx$name":{"$t":"acr_20"},"gsx$nameshort":{"$t":"ACR 20"},"gsx$namefriendly":{"$t":"20% improvement"},"gsx$namelong":{"$t":"20% improvement in RA symptoms"},"gsx$description":{"$t":"At least a 20% improvement in tender and swollen joint counts, and in at least three of five measures of disease activity or pain."},"gsx$tags":{"$t":"improvement"},"gsx$kind":{"$t":"composite"},"gsx$variable":{"$t":"dichotomous"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":""},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":"acr_tjc,acr_sjc,patient_pain,patient_global_das,physician_global_das,patient_physical_function,apr"},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/16273794"},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cu76f"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"acr_50"},"content":{"type":"text","$t":"nameshort: ACR 50, namefriendly: 50% improvement, namelong: 50% improvement in RA symptoms, description: At least a 50% improvement in tender and swollen joint counts, and in at least three of five measures of disease activity or pain., tags: improvement, kind: composite, variable: dichotomous, includedmeasures: acr_tjc,acr_sjc,patient_pain,patient_global_das,physician_global_das,patient_physical_function,apr, source: http://www.ncbi.nlm.nih.gov/pubmed/16273794"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cu76f"}],"gsx$name":{"$t":"acr_50"},"gsx$nameshort":{"$t":"ACR 50"},"gsx$namefriendly":{"$t":"50% improvement"},"gsx$namelong":{"$t":"50% improvement in RA symptoms"},"gsx$description":{"$t":"At least a 50% improvement in tender and swollen joint counts, and in at least three of five measures of disease activity or pain."},"gsx$tags":{"$t":"improvement"},"gsx$kind":{"$t":"composite"},"gsx$variable":{"$t":"dichotomous"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":""},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":"acr_tjc,acr_sjc,patient_pain,patient_global_das,physician_global_das,patient_physical_function,apr"},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/16273794"},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cvlqs"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"acr_70"},"content":{"type":"text","$t":"nameshort: ACR 70, namefriendly: 70% improvement, namelong: 70% improvement in RA symptoms, description: At least a 70% improvement in tender and swollen joint counts, and in at least three of five measures of disease activity or pain., tags: improvement, kind: composite, variable: dichotomous, includedmeasures: acr_tjc,acr_sjc,patient_pain,patient_global_das,physician_global_das,patient_physical_function,apr, source: http://www.ncbi.nlm.nih.gov/pubmed/16273794"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cvlqs"}],"gsx$name":{"$t":"acr_70"},"gsx$nameshort":{"$t":"ACR 70"},"gsx$namefriendly":{"$t":"70% improvement"},"gsx$namelong":{"$t":"70% improvement in RA symptoms"},"gsx$description":{"$t":"At least a 70% improvement in tender and swollen joint counts, and in at least three of five measures of disease activity or pain."},"gsx$tags":{"$t":"improvement"},"gsx$kind":{"$t":"composite"},"gsx$variable":{"$t":"dichotomous"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":""},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":"acr_tjc,acr_sjc,patient_pain,patient_global_das,physician_global_das,patient_physical_function,apr"},"gsx$source":{"$t":"http://www.ncbi.nlm.nih.gov/pubmed/16273794"},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cx0b9"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"discontinued_ae"},"content":{"type":"text","$t":"nameshort: withdrawal, namefriendly: discontinued due to an adverse event, namelong: withdrawal from a trial due to an adverse event or side effect, description: A participant left a study because of a side effect or \"adverse\" event, tags: adverse event,well being, kind: event, variable: dichotomous, assessor: clinician"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/cx0b9"}],"gsx$name":{"$t":"discontinued_ae"},"gsx$nameshort":{"$t":"withdrawal"},"gsx$namefriendly":{"$t":"discontinued due to an adverse event"},"gsx$namelong":{"$t":"withdrawal from a trial due to an adverse event or side effect"},"gsx$description":{"$t":"A participant left a study because of a side effect or \"adverse\" event"},"gsx$tags":{"$t":"adverse event,well being"},"gsx$kind":{"$t":"event"},"gsx$variable":{"$t":"dichotomous"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":"clinician"},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":""},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/d9ney"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"discontinued_efficacy"},"content":{"type":"text","$t":"nameshort: withdrawal, namefriendly: discontinued due to lack of efficacy, namelong: withdrawal from a trial due to lack of treatment efficacy, description: A participant left a study because they felt the medication wasn't working well, tags: satisfaction, kind: event, variable: dichotomous, assessor: clinician"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/d9ney"}],"gsx$name":{"$t":"discontinued_efficacy"},"gsx$nameshort":{"$t":"withdrawal"},"gsx$namefriendly":{"$t":"discontinued due to lack of efficacy"},"gsx$namelong":{"$t":"withdrawal from a trial due to lack of treatment efficacy"},"gsx$description":{"$t":"A participant left a study because they felt the medication wasn't working well"},"gsx$tags":{"$t":"satisfaction"},"gsx$kind":{"$t":"event"},"gsx$variable":{"$t":"dichotomous"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":"clinician"},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":""},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/db1zf"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"serious_ae"},"content":{"type":"text","$t":"nameshort: adverse event, namefriendly: serious adverse event, tags: adverse event, kind: event, variable: dichotomous, assessor: clinician"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/db1zf"}],"gsx$name":{"$t":"serious_ae"},"gsx$nameshort":{"$t":"adverse event"},"gsx$namefriendly":{"$t":"serious adverse event"},"gsx$namelong":{"$t":""},"gsx$description":{"$t":""},"gsx$tags":{"$t":"adverse event"},"gsx$kind":{"$t":"event"},"gsx$variable":{"$t":"dichotomous"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":"clinician"},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":""},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/dcgjs"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"haq"},"content":{"type":"text","$t":"nameshort: HAQ, namefriendly: Health Assessment Questionnaire, namelong: score on the Health Assessment Questionnaire, tags: well being, kind: questionnaire, assessor: patient"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/dcgjs"}],"gsx$name":{"$t":"haq"},"gsx$nameshort":{"$t":"HAQ"},"gsx$namefriendly":{"$t":"Health Assessment Questionnaire"},"gsx$namelong":{"$t":"score on the Health Assessment Questionnaire"},"gsx$description":{"$t":""},"gsx$tags":{"$t":"well being"},"gsx$kind":{"$t":"questionnaire"},"gsx$variable":{"$t":""},"gsx$max":{"$t":""},"gsx$assessor":{"$t":"patient"},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":""},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/ddv49"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"sf36_physical_20"},"content":{"type":"text","$t":"nameshort: SF-36, namefriendly: SF-36 physical 20% improvement, namelong: 20% improvement on the SF-36 health questionnaire physical component, tags: function,improvement, kind: questionnaire, variable: dichotomous, assessor: patient"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/ddv49"}],"gsx$name":{"$t":"sf36_physical_20"},"gsx$nameshort":{"$t":"SF-36"},"gsx$namefriendly":{"$t":"SF-36 physical 20% improvement"},"gsx$namelong":{"$t":"20% improvement on the SF-36 health questionnaire physical component"},"gsx$description":{"$t":""},"gsx$tags":{"$t":"function,improvement"},"gsx$kind":{"$t":"questionnaire"},"gsx$variable":{"$t":"dichotomous"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":"patient"},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":""},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/d415a"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"sf36_mental_20"},"content":{"type":"text","$t":"nameshort: SF-36, namefriendly: SF-36 mental 20% improvement, namelong: 20% improvement on the SF-36 health questionnaire mental component, tags: well being,improvement, kind: questionnaire, variable: dichotomous, assessor: patient"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/d415a"}],"gsx$name":{"$t":"sf36_mental_20"},"gsx$nameshort":{"$t":"SF-36"},"gsx$namefriendly":{"$t":"SF-36 mental 20% improvement"},"gsx$namelong":{"$t":"20% improvement on the SF-36 health questionnaire mental component"},"gsx$description":{"$t":""},"gsx$tags":{"$t":"well being,improvement"},"gsx$kind":{"$t":"questionnaire"},"gsx$variable":{"$t":"dichotomous"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":"patient"},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":""},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/d5fpr"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"remission"},"content":{"type":"text","$t":"nameshort: remission, namefriendly: remission, namelong: disease remission, tags: remission,improvement, kind: event, variable: dichotomous"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/d5fpr"}],"gsx$name":{"$t":"remission"},"gsx$nameshort":{"$t":"remission"},"gsx$namefriendly":{"$t":"remission"},"gsx$namelong":{"$t":"disease remission"},"gsx$description":{"$t":""},"gsx$tags":{"$t":"remission,improvement"},"gsx$kind":{"$t":"event"},"gsx$variable":{"$t":"dichotomous"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":""},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":""},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/d6ua4"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"permanent_work_disability"},"content":{"type":"text","$t":"nameshort: permanent work disability, namefriendly: permanent work disability, namelong: RA-related permanent work disability, tags: work,function, kind: event, variable: dichotomous"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/d6ua4"}],"gsx$name":{"$t":"permanent_work_disability"},"gsx$nameshort":{"$t":"permanent work disability"},"gsx$namefriendly":{"$t":"permanent work disability"},"gsx$namelong":{"$t":"RA-related permanent work disability"},"gsx$description":{"$t":""},"gsx$tags":{"$t":"work,function"},"gsx$kind":{"$t":"event"},"gsx$variable":{"$t":"dichotomous"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":""},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":""},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/d88ul"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"median_work_disability_days"},"content":{"type":"text","$t":"nameshort: days off work, namefriendly: days off work due to RA, namelong: days off work due to RA (median), tags: work,function, kind: count, variable: interval"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o5079mk/public/values/d88ul"}],"gsx$name":{"$t":"median_work_disability_days"},"gsx$nameshort":{"$t":"days off work"},"gsx$namefriendly":{"$t":"days off work due to RA"},"gsx$namelong":{"$t":"days off work due to RA (median)"},"gsx$description":{"$t":""},"gsx$tags":{"$t":"work,function"},"gsx$kind":{"$t":"count"},"gsx$variable":{"$t":"interval"},"gsx$max":{"$t":""},"gsx$assessor":{"$t":""},"gsx$relatedmeasures":{"$t":""},"gsx$includedmeasures":{"$t":""},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}}]}};
var mockMetrics   = {"version":"1.0","encoding":"UTF-8","feed":{"xmlns":"http://www.w3.org/2005/Atom","xmlns$openSearch":"http://a9.com/-/spec/opensearchrss/1.0/","xmlns$gsx":"http://schemas.google.com/spreadsheets/2006/extended","id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Metrics"},"link":[{"rel":"alternate","type":"application/atom+xml","href":"https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/pubhtml"},{"rel":"http://schemas.google.com/g/2005#feed","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values"},{"rel":"http://schemas.google.com/g/2005#post","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values"},{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values?alt=json"}],"author":[{"name":{"$t":"adamibaker"},"email":{"$t":"adamibaker@gmail.com"}}],"openSearch$totalResults":{"$t":"13"},"openSearch$startIndex":{"$t":"1"},"entry":[{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/cokwr"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"metric"},"content":{"type":"text","$t":"namefriendly: measure name (human-readable), notes: notes"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/cokwr"}],"gsx$name":{"$t":"metric"},"gsx$nameshort":{"$t":""},"gsx$namefriendly":{"$t":"measure name (human-readable)"},"gsx$description":{"$t":""},"gsx$presentation":{"$t":""},"gsx$source":{"$t":""},"gsx$notes":{"$t":"notes"}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/cpzh4"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"ar_100"},"content":{"type":"text","$t":"nameshort: absolute risk, namefriendly: absolute risk (out of 100), presentation: frequency"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/cpzh4"}],"gsx$name":{"$t":"ar_100"},"gsx$nameshort":{"$t":"absolute risk"},"gsx$namefriendly":{"$t":"absolute risk (out of 100)"},"gsx$description":{"$t":""},"gsx$presentation":{"$t":"frequency"},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/cre1l"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"ar_1000"},"content":{"type":"text","$t":"nameshort: absolute risk, namefriendly: absolute risk (out of 1000), presentation: frequency"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/cre1l"}],"gsx$name":{"$t":"ar_1000"},"gsx$nameshort":{"$t":"absolute risk"},"gsx$namefriendly":{"$t":"absolute risk (out of 1000)"},"gsx$description":{"$t":""},"gsx$presentation":{"$t":"frequency"},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/chk2m"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"rr"},"content":{"type":"text","$t":"nameshort: relative risk, presentation: value"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/chk2m"}],"gsx$name":{"$t":"rr"},"gsx$nameshort":{"$t":"relative risk"},"gsx$namefriendly":{"$t":""},"gsx$description":{"$t":""},"gsx$presentation":{"$t":"value"},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/ciyn3"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"or"},"content":{"type":"text","$t":"nameshort: odds ratio, presentation: value"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/ciyn3"}],"gsx$name":{"$t":"or"},"gsx$nameshort":{"$t":"odds ratio"},"gsx$namefriendly":{"$t":""},"gsx$description":{"$t":""},"gsx$presentation":{"$t":"value"},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/ckd7g"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"abs_difference"},"content":{"type":"text","$t":"nameshort: absolute difference, namefriendly: absolute treatment benefit, presentation: percentage"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/ckd7g"}],"gsx$name":{"$t":"abs_difference"},"gsx$nameshort":{"$t":"absolute difference"},"gsx$namefriendly":{"$t":"absolute treatment benefit"},"gsx$description":{"$t":""},"gsx$presentation":{"$t":"percentage"},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/clrrx"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"rel_difference"},"content":{"type":"text","$t":"nameshort: relative difference, namefriendly: relative percent change, presentation: percentage"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/clrrx"}],"gsx$name":{"$t":"rel_difference"},"gsx$nameshort":{"$t":"relative difference"},"gsx$namefriendly":{"$t":"relative percent change"},"gsx$description":{"$t":""},"gsx$presentation":{"$t":"percentage"},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/cyevm"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"mean_score"},"content":{"type":"text","$t":"nameshort: mean score, presentation: value"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/cyevm"}],"gsx$name":{"$t":"mean_score"},"gsx$nameshort":{"$t":"mean score"},"gsx$namefriendly":{"$t":""},"gsx$description":{"$t":""},"gsx$presentation":{"$t":"value"},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/cztg3"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"mean_score_difference"},"content":{"type":"text","$t":"nameshort: mean difference in score, description: \"The mean difference is the average difference between the intervention group and the control group across studies.\", presentation: value, source: http://www.cochranelibrary.com/about/explanations-for-cochrane-summary-of-findings-sof-tables.html"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/cztg3"}],"gsx$name":{"$t":"mean_score_difference"},"gsx$nameshort":{"$t":"mean difference in score"},"gsx$namefriendly":{"$t":""},"gsx$description":{"$t":"\"The mean difference is the average difference between the intervention group and the control group across studies.\""},"gsx$presentation":{"$t":"value"},"gsx$source":{"$t":"http://www.cochranelibrary.com/about/explanations-for-cochrane-summary-of-findings-sof-tables.html"},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/d180g"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"percentage"},"content":{"type":"text","$t":"nameshort: percentage, namefriendly: percentage of people, presentation: percentage"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/d180g"}],"gsx$name":{"$t":"percentage"},"gsx$nameshort":{"$t":"percentage"},"gsx$namefriendly":{"$t":"percentage of people"},"gsx$description":{"$t":""},"gsx$presentation":{"$t":"percentage"},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/d2mkx"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"mean_score_10"},"content":{"type":"text","$t":"nameshort: mean score (out of 10), presentation: value"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/d2mkx"}],"gsx$name":{"$t":"mean_score_10"},"gsx$nameshort":{"$t":"mean score (out of 10)"},"gsx$namefriendly":{"$t":""},"gsx$description":{"$t":""},"gsx$presentation":{"$t":"value"},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/cssly"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"mean_score_100"},"content":{"type":"text","$t":"nameshort: mean score (out of 100), presentation: value"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/cssly"}],"gsx$name":{"$t":"mean_score_100"},"gsx$nameshort":{"$t":"mean score (out of 100)"},"gsx$namefriendly":{"$t":""},"gsx$description":{"$t":""},"gsx$presentation":{"$t":"value"},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/cu76f"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"count"},"content":{"type":"text","$t":"nameshort: count, presentation: value"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/ojmf289/public/values/cu76f"}],"gsx$name":{"$t":"count"},"gsx$nameshort":{"$t":"count"},"gsx$namefriendly":{"$t":""},"gsx$description":{"$t":""},"gsx$presentation":{"$t":"value"},"gsx$source":{"$t":""},"gsx$notes":{"$t":""}}]}};
var mockTags      = {"version":"1.0","encoding":"UTF-8","feed":{"xmlns":"http://www.w3.org/2005/Atom","xmlns$openSearch":"http://a9.com/-/spec/opensearchrss/1.0/","xmlns$gsx":"http://schemas.google.com/spreadsheets/2006/extended","id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"Tags"},"link":[{"rel":"alternate","type":"application/atom+xml","href":"https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/pubhtml"},{"rel":"http://schemas.google.com/g/2005#feed","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values"},{"rel":"http://schemas.google.com/g/2005#post","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values"},{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values?alt=json"}],"author":[{"name":{"$t":"adamibaker"},"email":{"$t":"adamibaker@gmail.com"}}],"openSearch$totalResults":{"$t":"9"},"openSearch$startIndex":{"$t":"1"},"entry":[{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/cokwr"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"measure name / code"},"content":{"type":"text","$t":"namefriendly: measure name (human-readable)"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/cokwr"}],"gsx$name":{"$t":"measure name / code"},"gsx$nameshort":{"$t":""},"gsx$namefriendly":{"$t":"measure name (human-readable)"},"gsx$description":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/cpzh4"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"pain"},"content":{"type":"text","$t":"nameshort: Pain, namefriendly: Pain, description: Pain, including tenderness in joints and self-reported pain."},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/cpzh4"}],"gsx$name":{"$t":"pain"},"gsx$nameshort":{"$t":"Pain"},"gsx$namefriendly":{"$t":"Pain"},"gsx$description":{"$t":"Pain, including tenderness in joints and self-reported pain."}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/cre1l"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"function"},"content":{"type":"text","$t":"nameshort: Physical function, namefriendly: Physical function, description: Ability to do daily activities, a combination of how you feel and how well your joints are working."},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/cre1l"}],"gsx$name":{"$t":"function"},"gsx$nameshort":{"$t":"Physical function"},"gsx$namefriendly":{"$t":"Physical function"},"gsx$description":{"$t":"Ability to do daily activities, a combination of how you feel and how well your joints are working."}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/chk2m"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"improvement"},"content":{"type":"text","$t":"nameshort: Overall improvement, namefriendly: Overall improvement, description: Overall improvement, usually measured by looking at a combination of swelling, pain, RA disease activity, and how you're feeling."},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/chk2m"}],"gsx$name":{"$t":"improvement"},"gsx$nameshort":{"$t":"Overall improvement"},"gsx$namefriendly":{"$t":"Overall improvement"},"gsx$description":{"$t":"Overall improvement, usually measured by looking at a combination of swelling, pain, RA disease activity, and how you're feeling."}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/ciyn3"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"satisfaction"},"content":{"type":"text","$t":"nameshort: Satisfaction, namefriendly: Satisfaction, description: Satisfaction with how well a treatment is working."},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/ciyn3"}],"gsx$name":{"$t":"satisfaction"},"gsx$nameshort":{"$t":"Satisfaction"},"gsx$namefriendly":{"$t":"Satisfaction"},"gsx$description":{"$t":"Satisfaction with how well a treatment is working."}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/ckd7g"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"swelling"},"content":{"type":"text","$t":"nameshort: Swelling, namefriendly: Swollen joints"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/ckd7g"}],"gsx$name":{"$t":"swelling"},"gsx$nameshort":{"$t":"Swelling"},"gsx$namefriendly":{"$t":"Swollen joints"},"gsx$description":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/clrrx"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"biomarker"},"content":{"type":"text","$t":"nameshort: Lab results, namefriendly: Lab results"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/clrrx"}],"gsx$name":{"$t":"biomarker"},"gsx$nameshort":{"$t":"Lab results"},"gsx$namefriendly":{"$t":"Lab results"},"gsx$description":{"$t":""}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/cyevm"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"adverse event"},"content":{"type":"text","$t":"nameshort: Side effects, namefriendly: Side effects, description: Side effects, adverse events (undesirable outcomes), etc."},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/cyevm"}],"gsx$name":{"$t":"adverse event"},"gsx$nameshort":{"$t":"Side effects"},"gsx$namefriendly":{"$t":"Side effects"},"gsx$description":{"$t":"Side effects, adverse events (undesirable outcomes), etc."}},{"id":{"$t":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/cztg3"},"updated":{"$t":"2015-03-28T18:50:20.622Z"},"category":[{"scheme":"http://schemas.google.com/spreadsheets/2006","term":"http://schemas.google.com/spreadsheets/2006#list"}],"title":{"type":"text","$t":"well being"},"content":{"type":"text","$t":"nameshort: Well being, namefriendly: Well being, description: ?"},"link":[{"rel":"self","type":"application/atom+xml","href":"https://spreadsheets.google.com/feeds/list/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/o2pd8py/public/values/cztg3"}],"gsx$name":{"$t":"well being"},"gsx$nameshort":{"$t":"Well being"},"gsx$namefriendly":{"$t":"Well being"},"gsx$description":{"$t":"?"}}]}};

var OutcomeTimeline = React.createClass({
	propTypes: {
		disabledMedications: React.PropTypes.object
	},

  getDefaultProps: function () {
    return {
      medications: medications
    };
  },

  getInitialState: function () {
    var medicationMap = {};
    this.props.medications.forEach(function(medication, index) {
      medicationMap[medication.name] = index;
    });

    var getDosageForms = function(medications) {
      var dosageForms = {};
      medications.map(function(medication) {
        if (medication.forms) {
          medication.forms.forEach(function(form) {
            dosageForms[form.name] = false;
          });
        }
      });
      return dosageForms;
    };

    var getClasses = function(medications) {
      var classes = {};
      medications.map(function(medication) {
        if (medication.class) {
          medication.class.forEach(function(name) {
            classes[name] = false;
          });
        }
      });
      return classes;
    };

    return {
      data: {},
      selectedTag: null,
      selectedMeasure: null
    }
  },

  componentWillUnmount: function() {
    if (!iod.userAgent.isMobile()) {
      $(window).unbind('scroll', this.handleScrollEvent);
      $(window).unbind('resize', this.handleResizeEvent);
    }
  },

  handleScrollEvent: function() {
    $('.sticky-element').each(function() {
      var el            = $(this),
          offset        = el.offset(),
          scrollTop     = $(window).scrollTop(), // .iodine-bar['height']
          floated 			= $('.sticky-eleent-float', this);

      if ((scrollTop > offset.top) && (scrollTop < offset.top + el.height())) {
        floated.css({
          'visibility': 'visible',
          'top': 0
        });
      }
      else {
        floated.css({
          'visibility': 'hidden'
        });
      }
    });
  },

  handleResizeEvent: function() {
    this.setupStickyHeader();
    this.handleScrollEvent();
  },

  setupStickyHeader: function() {
    var clonedElement;
    var originalElement;
    $('.sticky-element').each(function() {
      clonedElement = $('.sticky-element.sticky-element-float.cloned-element', this);
      originalElement = $('.sticky-element.sticky-element-fixed', this);
      clonedElement
        .css('width', originalElement.width());
      originalElement.children().css('width', function(i, val) {
        return $(clonedElement).children().eq(i).css('width', val);
      });
      originalElement.children().css('width', function(i, val) {
        return $(clonedElement).children().eq(i).css('max-width', val);
      });
    });
  },

  setupStickyHeaderEventListeners: function() {
    $(window)
      .scroll(this.handleScrollEvent)
      .trigger('scroll');

    $(window)
      .resize(this.handleResizeEvent)
      .trigger('resize');
  },

  componentDidMount: function() {
    var instance = this;

    var sheets = {
      measures: 'o5079mk',
      metrics: 'ojmf289',
      grades: 'oo3g5h2',
      data: {
        biologics: 'oij9tdp',
        hydroxycholoroquine: 'oozzuoc',
        etanercept: 'oogh8lu',
        methotrexate: 'oa4uchu',
        finraco: 'oclozwl'
      },
      side_effects: {
        celecoxib: 'od6'
      },
      tagDescriptions: 'o2pd8py'
    };

    // Visit this with a browser to get the worksheet unique IDs
    var xmlListing = 'https://spreadsheets.google.com/feeds/worksheets/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/private/full';

    var key  = '1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0';
    var base = 'https://spreadsheets.google.com/feeds/list/'
             + key
             + '/';
    var end  = '/public/values?alt=json';

    // Get measures
    var processMeasures = this.processMeasures;
    var urlMeasures = base + sheets.measures + end;
    $.getJSON(urlMeasures, processMeasures);

    // Get metrics
    var processMetrics = this.processMetrics;
    var urlMetrics = base + sheets.metrics + end;
    $.getJSON(urlMetrics, processMetrics);

    // Get GRADE levels
    var processGrades = this.processGrades;
    var urlGrades = base + sheets.grades + end;
    $.getJSON(urlGrades, processGrades);

    // Get tag descriptions
    var processTagDescriptions = this.processTagDescriptions;
    var urlTagDescriptions = base + sheets.tagDescriptions + end;
    $.getJSON(urlTagDescriptions, processTagDescriptions);

    // Get data
    // Loop through the data source spreadsheets, projecting each one into a more useful format.
    var processData = this.processData;
    Object.keys(sheets.data).forEach(function (source) {
      var urlData = base + sheets.data[source] + end;
      $.getJSON(urlData, processData);
    });
  },

  processTagDescriptions: function(data) {
    var tagDescriptions = {};

    $.each(data.feed.entry, function (index, value) {
      if (index == 0) {
        return;
      }
      var key = value.gsx$name.$t;
      var entry = {};
          entry['name'] = key;
          entry['description'] = value.gsx$description.$t;
          entry['name_friendly'] = value.gsx$namefriendly.$t;
          entry['name_short'] = value.gsx$nameshort.$t;
      tagDescriptions[key] = entry;
    });

    this.setState({
      tagDescriptions: tagDescriptions
    });

    // this.tempTags = data;
  },

  processData: function(data) {
    var processedData = [];

    $.each(data.feed.entry, function (index, value) {
      if (index == 0) {
        return;
      }
      var entry = {};
          // Key
          entry['which']                          = value.gsx$which ? value.gsx$which.$t : null;

          // Population / intervention / comparison
          entry['population']                     = value.gsx$population ? value.gsx$population.$t.split(',') : null;
          entry['intervention']                   = value.gsx$intervention ? value.gsx$intervention.$t.split(',') : null;
          entry['comparison']                     = value.gsx$comparison ? value.gsx$comparison.$t.split(',') : null;
          entry['n']                              = value.gsx$ntotal && getNumber(value.gsx$ntotal.$t);
          entry['n_type']                         = value.gsx$type && value.gsx$ntype.$t;

          // Outcome
          entry['measure']                        = value.gsx$measure ? value.gsx$measure.$t : null;
          entry['measure_detail']                 = value.gsx$measuredetail ? value.gsx$measuredetail.$t : null;
          entry['metric']                         = value.gsx$metric ? value.gsx$metric.$t : null;
          entry['grade']                          = value.gsx$grade ? value.gsx$grade.$t : null;

          // Value
          entry['value']                          = {};
          entry['value']['value']                   = value.gsx$value && getNumber(value.gsx$value.$t);
          entry['value']['value_ci_low']            = value.gsx$valuecilow && getNumber(value.gsx$valuecilow.$t);
          entry['value']['value_ci_high']           = value.gsx$valuecihigh && getNumber(value.gsx$valuecihigh.$t);
          entry['value']['value_sd']                = value.gsx$valuesd && getNumber(value.gsx$valuesd.$t);
          entry['value']['value_iqr_low']           = value.gsx$valueiqrlow && getNumber(value.gsx$valueiqrlow.$t);
          entry['value']['value_iqr_high']          = value.gsx$valueiqrhigh && getNumber(value.gsx$valueiqrhigh.$t);

          // Duration
          entry['duration']                       = {};
          entry['duration']['low']                  = value.gsx$durationlow ? value.gsx$durationlow.$t : null;
          entry['duration']['high']                 = value.gsx$durationhigh ? value.gsx$durationhigh.$t : null;
          entry['duration']['interval']             = value.gsx$durationinterval ? value.gsx$durationinterval.$t : null;

          // Dosage
          entry['dosage']                         = {};
          entry['dosage']['dosage']                 = value.gsx$dosage ? value.gsx$dosage.$t : null;
          entry['dosage']['dosage_form']            = value.gsx$dosageform ? value.gsx$dosageform.$t.split(',') : null;
          entry['dosage']['dosage_frequency']       = value.gsx$dosagefrequency ? value.gsx$dosagefrequency.$t : null;
          entry['dosage']['dosage_multiple']        = value.gsx$dosagemultiple ? value.gsx$dosagemultiple.$t : null;
          entry['dosage']['dosage_interval']        = value.gsx$dosageinterval ? value.gsx$dosageinterval.$t : null;

          // Evidence source and notes
          entry['source']                         = value.gsx$source ? value.gsx$source.$t : null;
          entry['notes']                          = value.gsx$notes ? value.gsx$notes.$t : null;
          entry['kind']                           = value.gsx$kind ? value.gsx$kind.$t : null;
      processedData.push(entry);
    });

    // Get the sheet title, which will be used as its unique key
    // e.g. 'CSR biologics'
    var title = data.feed.title.$t;
    var newData = this.state.data;
        newData[title] = processedData;

    this.setState({
      data: newData
    });

    // this.tempData = data;
  },

  processGrades: function(data) {
    var grades = {};

    $.each(data.feed.entry, function (index, value) {
      if (index == 0) {
        return;
      }
      var key = value.gsx$grade.$t;
      var entry = {};
          entry['grade'] = key;
          entry['description'] = value.gsx$description.$t;
          entry['description_friendly'] = value.gsx$descriptionfriendly.$t;
          entry['name_friendly'] = value.gsx$namefriendly.$t;
          entry['notes'] = value.gsx$namefriendly.$t;
          entry['source'] = value.gsx$source.$t;
      grades[key] = entry;
    });

    this.setState({
      grades: grades
    });

    // this.tempGrades = data;
  },

  processMeasures: function(data) {
    var measures = {};
    var tagMap = {};

    $.each(data.feed.entry, function (index, value) {
      if (index == 0) {
        return;
      }
      var key = value.gsx$name.$t;
      var entry = {};
          entry['name']                 = key;
          entry['name_short']           = value.gsx$nameshort.$t;
          entry['name_long']            = value.gsx$namelong.$t;
          entry['name_friendly']        = value.gsx$namefriendly.$t;
          entry['description']          = value.gsx$description.$t;
          entry['tags']                 = value.gsx$tags.$t && value.gsx$tags.$t.split(',');
          entry['kind']                 = value.gsx$kind.$t;
          entry['variable']             = value.gsx$variable.$t;
          entry['assessor']             = value.gsx$assessor.$t;
          entry['related_measures']     = value.gsx$relatedmeasures.$t && value.gsx$relatedmeasures.$t.split(',');
          entry['included_measures']    = value.gsx$includedmeasures.$t && value.gsx$includedmeasures.$t.split(',');
          entry['source']               = value.gsx$source.$t;
          entry['notes']                = value.gsx$notes.$t;
      measures[key] = entry;

      // Populate tags object based on any applied to this measure
      if (measures[key]['tags'].length > 0) {
        measures[key]['tags'].forEach(function (tag) {
          // If there's no entry for this particular tag, create an object to house
          // corresponding measures and data that match that tag.
          if (!tagMap[tag]) {
            tagMap[tag] = {};
            // tagMap[tag]['data'] = [];
          }
          tagMap[tag][key] = true;
        });
      }
    });

    this.setState({
      measures: measures,
      tags: tagMap
    });

    // this.tempMeasures = measures;
  },

  processMetrics: function(data) {
    var metrics = {};

    $.each(data.feed.entry, function (index, value) {
      if (index == 0) {
        return;
      }
      var key = value.gsx$name.$t;
      var entry = {};
          entry['name']                 = key;
          entry['name_short']           = value.gsx$nameshort.$t;
          entry['name_friendly']        = value.gsx$namefriendly.$t;
          entry['description']          = value.gsx$description.$t;
          entry['presentation']         = value.gsx$presentation.$t;
          entry['kind']         				= value.gsx$kind.$t;
          entry['source']               = value.gsx$source.$t;
          entry['notes']                = value.gsx$notes.$t;
      metrics[key] = entry;
    });

    this.setState({
      metrics: metrics
    });

    // this.tempMetrics = data;
  },

  renderDataBySource: function(data) {
    Object.keys(data).map(function (source) {
      return (
        <section className='data'>
          <h2>{source} data</h2>
          <ul>
            {data[source].map(function (entry, i) {
              return (
                <li key={i}>
                  <h3>{i}</h3>
                  <p>{entry.which}</p>
                  <div>
                    <ul>
                      {Object.keys(entry).map(function (key, i) {
                        return (
                          <li key={i}>
                            <small>{key}</small>
                            {entry[key]}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      );
    });
  },

  renderFollowUpTime: function(duration, measure) {
    var low = duration.low;
    var high = duration.high;
    var interval = duration.interval;

    (low && !high) && (high = low);
    (!low && high) && (low = high);

    var durationString = low == high ? low : low + ' to ' + high;
    var intervalString = low > 1 ? interval + 's' : interval;

    return (
      <div>
        <strong>{durationString} {intervalString}</strong><br />
        <span className='light'>Researchers looked at {measure ? measure : 'this'} {durationString} {intervalString} after people started treatment.</span>
      </div>
    );
  },

  renderValue: function(results, metric, comparisonResults) {
    // results = the data/finding, passed as part of an entry as population / intervention / comparison
    // metric (optional) = the preferred metric to render. often helpful if a specific metric is required. otherwise there's logic to render all of them.
    // comparisonResults = a pair dataset used for relative comparisons, i.e. the "comparison" to an intervention
    // preferredKind = what kind of value to show — a difference/comparison…

    var grades = this.state.grades;
    var measures = this.state.measures;
    var metrics = this.state.metrics;
    var tags = this.state.tags;
    var selectedTag = this.state.selectedTag;

    var renderAbsoluteRisk = this.renderAbsoluteRisk;
    var renderDifference = this.renderDifference;
    var renderPercentage = this.renderPercentage;
    var renderNumber = this.renderNumber;

    var renderAppropriateVisualization = function(results, metric, measure) {
      if (metrics[metric]) {
        if (metrics[metric].presentation == 'frequency') {
          return renderAbsoluteRisk(results, metric, measure, comparisonResults);
        }
        if (metrics[metric].presentation == 'percentage') {
          return renderPercentage(results, metric, measure);
        }
        if (metrics[metric].presentation == 'difference') {
          return renderDifference(results, metric, measure);
        }
        else {
          return renderNumber(results, metric, measure);
        }
      }
    };

    if (metric) {
      if (results[metric]) {
        return renderAppropriateVisualization(results, metric, results[metric].measure);
      }
    }
    else {
      // Iterate through all the keys (ar_1000, ar_100, etc.) to see whether we can render a value for each
      return Object.keys(results).map(function (metric) {
        // If we know how to render this kind of metric
        if (metrics[metric]) {
          // For now, only render absolute-kind of metrics
          if (!comparisonResults) {
          	if (metrics[metric].kind == 'absolute') {
            	return renderAppropriateVisualization(results, metric, results[metric].measure);
            }
          }
        }
      });
    }
  },

  renderNumber: function(results, metric, measure) {
    var metrics = this.state.metrics;
    var data = results[metric];

    return (
      <div>
        {results.parts && <span>{results.parts.join(' + ')}<br /></span>}
        <small>{metrics[metric].name_short}</small><br />
        <strong>{data.value.value}</strong> {metric == 'ar_100' && <span className='light'>of 100 people<br /></span>} {metric == 'ar_1000' && <span className='light'>of 1000 people<br /></span>}
        {data.value.value_ci_low && data.value.value_ci_high &&
          <span>({data.value.value_ci_low} to {data.value.value_ci_high})</span>
        }
      </div>
    );
  },

  renderPercentage: function(results, metric, measure) {
    var metrics = this.state.metrics;
    var data = results[metric];

    return (
      <div>
        {results.parts && <span>{results.parts.join(' + ')}<br /></span>}
        <small>{metrics[metric].name_short}</small><br />
        <strong>{Math.round(data.value.value * 100) + '%'}</strong><br />
        {data.value.value_ci_low && data.value.value_ci_high &&
          <span>({Math.round(data.value.value_ci_low * 100) + '%'} to {Math.round(data.value.value_ci_high * 100) + '%'})</span>
        }
      </div>
    );
  },

  renderAbsoluteRisk: function(results, metric, measure, comparisonResults) {
    var measures = this.state.measures;

    var measure = results[metric].measure;
    var data = results[metric].value;

    var baseline = comparisonResults ? comparisonResults[metric].value.value : null;

    return (
      <div>
        <strong>{data.value && (metric == 'ar_1000' ? Math.floor(data.value * 0.1) : data.value)}</strong> <span className='light'>of 100 people</span>
        <AbsoluteFrequency frequency={data.value} metric={metric} denominator={100} breakpoint={10} baseline={baseline} />
      </div>
    );
  },

  renderDifference: function(results, metric, measure) {
    var measures = this.state.measures;
    var metrics = this.state.metrics;

    var measure = results[metric].measure;
    var data = results[metric].value;

    return (
      <div>
        {results.parts && <span>{results.parts.join(' + ')}<br /></span>}
        <span className='light'>Outcome: {measures[measure].name_friendly}</span><br />
        <small>{metrics[metric].name_short}</small><br />
        {data.value && <Difference value={data.value} metric={metric} />}
        {data.value_ci_low && data.value_ci_high &&
          <span>({data.value_ci_low} to {data.value_ci_high})</span>
        }
      </div>
    );
  },

  getDataByTag: function(tags, data) {
    var dataByTag = JSON.parse(JSON.stringify(tags));

    // Each tag (pain, function, etc.)
    Object.keys(tags).map(function (tag) {
      // Each source (sheet of data)
      Object.keys(data).map(function (source) {
        // Each entry in the source data (line of sheet)
        data[source].map(function (entry) {
          // Entry records an outcome in a measure that is associated with one of the tags?
          // e.g. tags['pain']['patient_pain'] or ['improvement']['acr_50']
          if (tags[tag][entry.measure]) {
            // Create a place for data about each measure
            dataByTag[tag][entry.measure] === true && (dataByTag[tag][entry.measure] = {});
            !dataByTag[tag][entry.measure]['data'] && (dataByTag[tag][entry.measure]['data'] = []);

            dataByTag[tag][entry.measure]['data'].push(entry);
          }
        });
      });
    });

    return dataByTag;
  },

  getEntriesForMeasure: function(entries) {
    /*
        PROCESSING DIFFERENT KINDS OF 'FINDINGS', PIVOTED AROUND A MEASURE.

        Here data are reprojected around a measure—for example, ACR 50 (50% improvement
        in RA symptoms). We iterate over the rows that show 'acr_50' as the 'measure', and
        reorganize the data into a sensible chunk.

        Each measure here is used to describe an outcome, a data point from research:
        the result of a study or an estimate of effect. It may be a way of describing what was observed
        when a treatment was administered, or a placebo, what happened to a population of people
        over time, an estimate of effect derived as a result of an analysis of multiple studies.

        Importantly, each row describes a certain MEASURE (outcome) using a certain METRIC.
        Multiple rows might be used to report the *same measure* with *multiple metrics*.
        For example, the same outcome might be recorded as a frequency, as a percent change,
        and as a relative risk ratio compared to some baseline.

        For example:

          ROW 1
          - measure: 'acr_50'
          - metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
          - value: '23'

          ROW 2
          - measure: 'acr_50'
          - metric: 'abs_difference' (absolute change or difference, a.k.a. absolute treatment benefit)
          - value: '0.15'

          ROW 3
          - measure: 'acr_50'
          - metric: 'rr'
          - value: '3.0'

        With three rows referring to the same measure, we need a way of knowing what "finding"
        we're looking at, so we can group all the data together, and pick and choose the metrics
        we need for our UI. So, each row also has information about the treatment, population, comparison,
        and other information necessary to know what finding we're talking about. In effect, each row
        contains almost all the information necessary to 'recreate' a minimal understanding of the
        experiment or study that produced the result. For example, the row might

          ROW 1
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
          - value: '23'

          ROW 2
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'abs_difference' (absolute change or difference, a.k.a. absolute treatment benefit)
          - value: '0.15'

          ROW 3
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'rr'
          - value: '3.0'

        The 'intervention' and 'comparison' fields (columns in the spreadsheet) describe (basically)
        the treatment that was administered and what comparison was made. There are other fields that
        elaborate on the treatment and comparison, but effectively, here's what we can learn from
        the example above:

          - Methotrexate was the treatment, and results compared to treatment with a placebo.
          - The outcome (ACR 50) was achieved by (or estimated at) 15 of 100 patients.
          - The absolute treatment benefit (difference) compared to placebo was 15%.
          - The relative risk (likelihood of experiencing that outcome) was 3.0.

        It is possible from this information to *infer* the comparison (placebo) data. With an absolute
        risk (frequency) of 23 of 100 (23%), and an absolute treatment benefit of 15%:

          23%   absolute risk
         -15%   absolute treatment benefit (absolute difference)
        -----
           8%   placebo's absolute risk

        Similarly, the relative risk of 3.0 tells us that the absolute risk of the comparison (placebo)
        would be:

          23%   absolute risk
         ÷ 3    relative risk
        -----
          ~8%   placebo's absolute risk

        However, in most cases where a comparison is involved, the data for the comparison are ALSO
        recorded in a row in the spreadsheet. So, here's rows 0 through 3, all of which describe a
        single "finding".

          ROW 0
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
          - value: '8'

          ROW 1
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
          - value: '23'

          ROW 2
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'abs_difference' (absolute change or difference, a.k.a. absolute treatment benefit)
          - value: '0.15'

          ROW 3
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'rr'
          - value: '3.0'

        So, now there appears to be no way to distinguish between rows 0 and 1. Both say that the
        intervention was methotrexate, and the comparison was placebo, and report ACR 50, with the
        same metric. But one says the value was '8' and the other says '23'. Which was the methotrexate
        value, and which was the placebo value?

        Each row has a field called 'which', which tells us *which* of the intervention or comparison
        this particular row refers to. So:

          ROW 0
          - which: 'comparison'
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
          - value: '8'

          ROW 1
          - which: 'intervention'
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'ar_100' (absolute risk out of 100, a.k.a. frequency)
          - value: '23'

          ROW 2
          - which: 'intervention'
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'abs_difference' (absolute change or difference, a.k.a. absolute treatment benefit)
          - value: '0.15'

          ROW 3
          - which: 'intervention'
          - intervention: 'methotrexate'
          - comparison: 'placebo'
          - measure: 'acr_50'
          - metric: 'rr'
          - value: '3.0'

        Now we know that row 0 refers to the comparison (placebo) and all the other rows refer to
        the intervention (methotrexate). We can use this to group all those rows together—they all refer
        to a finding: How methotrexate compares to placebo in terms of the ACR 50 outcome.

        (Of course, 'methotrexate' and 'placebo' and 'ACR 50' alone are insufficient to describe
        the study at hand, so other fields are also used to group a finding around a measure.
        For example population, dosage, duration of study/follow-up time, and data source.)

        TYPICAL CASES

        In general, there are a few standard cases we'll encounter and need to deal with in order
        to gather and reproject data around a measure. They are:

          1. intervention only
          2. comparison + intervention
          3. population
          - ...

        1. INTERVENTION ONLY

        If *only* an intervention is specified, then no comparison information is available. In such
        cases, we should assume that the only kinds of metrics that will be reported are absolute
        numbers, rather than information about change. For example, if there's no comparison, there
        is no way to report any kind of difference or relative value. We might see this in the case
        of side effects from clinical trials, where the data source (a drug product label or monograph)
        might just say that a certain side effect occurred at a certain frequency. For example:

          ROW FROM SIDE EFFECTS SPREADSHEET
          - which: 'intervention'
          - intervention: 'celecoxib'
          - measure: 'ae'
          - measure_detail: 'Nausea'
          - metric: 'percentage'
          - value: '0.07'

        In intervention-only cases, we want to reproject the data around a key which is sufficient
        to describe the intervention:

          key = measure + intervention + dosage + source (+ measure_detail)

        All the metrics that are used to describe that specific outcome are grouped under that key.

        2. COMPARISON + INTERVENTION

        In comparison cases, it's likely we have more rows and multiple metrics describing the measure
        (outcome) of interest. In a single data source we might even have many interventions compared
        to placebo. For example, in the Cochrane review of systematic reviews of biologic DMARDs for
        RA, estimates of effect are reported for 6 drugs (interventions) compared to placebo,
        for two measures (ACR 50 and discontinuation due to an adverse event), and using many metrics,
        some absolute risk frequency, some relative differences, etc.

        Because there may be many rows that need to be "grouped" to describe the relevant findings,
        we use a key that includes the comparison:

          key = measure + comparison + intervention + dosage + source (+ measure_detail)

        TODO: describe how the "study details" are recorded/divided

        3. POPULATION

        TODO: describe this case


        OUTPUT

        Ultimately, we want to end up with reprojected data that is organized around 'finding groups',
        so to speak, which we can then use for visualizations and comparisons etc.

        TODO: Better description of this.

        For example:

        'acr_50' = {
          'placebo-methotrexate (oral, parenteral) (5 mg-25 mg / week)-52 52 week-http://www.ncbi.nlm.nih.gov/pubmed/24916606': {},
          'dmard only-etanercept (subcutaneous) (25 mg 2x / week)-6 24 month-http://www.ncbi.nlm.nih.gov/pubmed/23728649': {}
        }

        Each object in the 'acr_50' object is a unique group of findings, possibly including multiple measures.

    */

    // If there are no entries for this measure, stop.
    //
    if (!entries || entries.length == 0) {
      return;
    }

    var reprojected = {};

    entries.forEach(function (entry, i) {

      // Construct a key based on the properties of this entry.
      //
      var key = entry.measure
              + entry.comparison
              + entry.intervention
              + entry.population
              + entry.duration_low + entry.duration_high + entry.duration_interval
              + entry.source;


      // Check to see if we already have an object for this key a.k.a. 'finding group.' This will be true when:
      //
      // - We already encountered a row for the 'comparison'
      // - We already saw an entry for this measure, reported with a different metric
      //
      // It's a new object.
      //
      if (!reprojected[key]) {
        // Set up an empty object to hold the data
        //
        reprojected[key] = {};

        // Populate Basic details of the 'finding group'
        //
        // reprojected[key]['n']                          = entry.n_total;
        reprojected[key]['measure']                       = entry.measure;          // Repeated for later convenience of use
        reprojected[key]['quality']                       = entry.grade;
        reprojected[key]['source']                        = entry.source;
        reprojected[key]['kind']                          = entry.kind;

        // Duration / follow-up
        //
        reprojected[key]['duration']                      = entry.duration;
        // reprojected[key]['follow_up']                  = renderFollowUpTime(entry.duration_low, entry.duration_high, entry.duration_interval);
      }

      // Describe what kind of 'finding group' this is—a high level distinction
      // used to decide how to present data in the UI later.
      //
      // COMPARISON + INTERVENTION CASE
      // If we encounter a row whose 'which' == 'comparison', we know that we have a full on intervention-comparison case,
      // and can mark this 'finding group' as such.
      //
      if (entry.which == 'comparison' || entry.which == 'population') {
        reprojected[key]['which'] = entry.which;
      }

      // Details of the comparison, intervention, or population
      //
      if (!reprojected[key][entry.which]) {
        reprojected[key][entry.which]                     = {};
      }
      reprojected[key][entry.which]['which']                = entry.which;
      reprojected[key][entry.which]['parts']                = entry[entry.which];       // Array    // = entry.comparison.join(' + ');
      reprojected[key][entry.which]['dosage']               = entry.dosage;
      reprojected[key][entry.which]['notes']                = entry.notes;


      // Metrics and values
      //
      if (!reprojected[key][entry.which][entry.metric]) {
        reprojected[key][entry.which][entry.metric] = {};
      }
      reprojected[key][entry.which][entry.metric]['value']  = entry.value;          // Object with all confidence bounds, etc. if reported.
      reprojected[key][entry.which][entry.metric]['which']  = entry.which;          // Repeated here because they're useful and can be passed to UI elements
      reprojected[key][entry.which][entry.metric]['measure']= entry.measure;        // Repeated here because they're useful and can be passed to UI elements
    });

    return reprojected;
  },

  getDurationAsWeeks: function(duration) {
		// Should average to get common duration? Or use one end of range?
		// i.e. if 4 to 12 weeks, use 4, 12, or 8?

		if (duration.interval == 'month') {
			return duration.low * 4;
		}
		else if (duration.interval == 'week') {
			return duration.low;
		}
	},

  groupEntriesByDuration: function(entries, boundary) {
  	var getDurationAsWeeks = this.getDurationAsWeeks;

  	var entriesByDuration = {};

  	Object.keys(entries).forEach(function (entry) {
  		var currentEntry = entries[entry];

  		if (currentEntry.duration.low) {
  			var numberOfWeeks = getDurationAsWeeks(currentEntry.duration);

  			if (!entriesByDuration[numberOfWeeks]) {
  				entriesByDuration[numberOfWeeks] = [];
  			}
  			entriesByDuration[numberOfWeeks].push(currentEntry);
  		}
  	});

  	return entriesByDuration;
  },

  filterEntriesByMedication: function(entries) {
  	var disabledMedications = this.props.disabledMedications;

  	console.log('WILL BE FILTERED')
  	

  	// TODO use underscore to
  	// filter entries to only those with intervention.parts containing a NON-disabled medication
  	
  	_.mapObject(entries, function(val, key) {
  		console.log('VALUE', val.intervention.parts);
  	});

  	return entries;
  },

  renderTimelineByMeasure: function(measures) {
    var measureMap = this.state.measures;
    var grades = this.state.grades;
    var getDurationAsWeeks = this.getDurationAsWeeks;
    var filterEntriesByMedication = this.filterEntriesByMedication;
    var getEntriesForMeasure = this.getEntriesForMeasure;
    var groupEntriesByDuration = this.groupEntriesByDuration;
    var renderEntry = this.renderEntry;
    var renderValue = this.renderValue;

    var renderRelativeRiskComparison = function(entries, measure) {
      var sources = {};

      Object.keys(entries).map(function (key) {
        var entry = entries[key];

        if (entry.which == 'comparison') {
          if (!sources[entry.comparison.parts]) {
            sources[entry.comparison.parts] = {};
            sources[entry.comparison.parts]['items'] = [];
          }
          sources[entry.comparison.parts]['baseline'] = entry.comparison;

          // Check to see that we have relative risk
          if (entry.intervention.rr) {
            sources[entry.comparison.parts].items.push(entry.intervention);
          }
        }
      });

      return Object.keys(sources).map(function (comparison) {
        if (sources[comparison].items.length > 1) {
          return (
            <ul className='visualization-rr'>
              <li>
                <h3><strong>relative risk</strong> › {measureMap[measure].name_friendly}</h3>
              </li>
              <li>
                <RelativeRiskComparison
                  baseline={sources[comparison].baseline}
                  items={sources[comparison].items}
                  measure={measure} />
              </li>
            </ul>
          );
        }
      })
    };

    var renderRiskRelativeToBaselineComparison = function(entries, measure) {
      var sources = {};

      Object.keys(entries).map(function (key) {
        var entry = entries[key];

        if (entry.which == 'comparison') {
          if (!sources[entry.comparison.parts]) {
            sources[entry.comparison.parts] = {};
            sources[entry.comparison.parts]['items'] = [];
          }
          sources[entry.comparison.parts]['comparison'] = entry.comparison;

          // Check to see that we have relative risk
          if (entry.intervention.rr) {
            sources[entry.comparison.parts].items.push(entry.intervention);
          }
        }
      });

      return Object.keys(sources).map(function (comparison) {
        if (sources[comparison].items.length > 1) {
          return (
            <ul className='visualization-rr'>
              <li>
                <h3><strong>relative risk</strong> › {measureMap[measure].name_friendly}</h3>
              </li>
              <li>
                <RiskRelativeToBaseline
                  comparison={sources[comparison].comparison}
                  items={sources[comparison].items}
                  measure={measure}
                  measures={measureMap} />
              </li>
            </ul>
          );
        }
      })
    };

    var measure = this.state.selectedMeasure ? this.state.selectedMeasure : Object.keys(measures)[0];
    var measureData = measures[measure].data;

    if (measureData) {
      var durations = groupEntriesByDuration(filterEntriesByMedication(getEntriesForMeasure(measureData)));
      // var entries = getEntriesForMeasure(measureData);

      return (
      	<div>
      		{this.renderMeasureBar(measures)}
	        <div key={measure}>
	        	<section className='outcome-timeline'>
			      	<section>
			      		<div className='moment'>
			      			<section>
			        			<div className='title'>Start</div>
			        			<div className='line'>
			        				<div className='bar'></div>
			        			</div>
			        			<div className='description'>Assignment.</div>
			        		</section>
			      		</div>
			      		<div className='moment-data'>
			      			<section>
				      			{Object.keys(durations).map(function (numberOfWeeks) {
					        		var entries = durations[numberOfWeeks];

						        	return entries.map(function (entry, i) {
						      			if (entry.intervention) {
							      			return (
								         		<div key={i}>
                              <Intervention intervention={entry.intervention.parts.join(' + ')} dosage={entry.intervention.dosage} />
                            </div>
								         	);
								        }
							       	});
										})}
									</section>
				      	</div>
				      </section>

              {Object.keys(durations).map(function (timepoint) {
				      	return (
				      		<section key={measure + timepoint}>
					      		<div className='moment'>
					      			<section>
					        			<div className='title'><strong>{timepoint} weeks</strong></div>
					        			<div className='line'>
					        				<div className='ball'></div>
					        			</div>
					        			<div className='description'>
					        				<strong>{measureMap[measure].name_short}</strong> {measureMap[measure].name_friendly}
						              {measureMap[measure].description && <p>{measureMap[measure].description}</p>}
					        			</div>
					        		</section>
					      		</div>
					      		<div className='moment-data'>
								      <section>
						      			{Object.keys(durations).map(function (numberOfWeeks) {
							        		var entries = durations[numberOfWeeks];

							        		return entries.map(function (entry, i) {
								        		if (entry.intervention && (getDurationAsWeeks(entry.duration) == timepoint)) {
									      			return (
										         		<div key={i}>
										         			{/* entry.intervention.ar_1000 ? renderValue(entry.intervention, 'ar_1000') : renderValue(entry.intervention, 'ar_100') */}
                                  {renderValue(entry.intervention)}
										         			<Source source={entry.source} kind={entry.kind} />
                                  <GradeQuality grade={entry.quality} gradeMap={grades} />
										         		</div>
										         	);
										        }
										        else if (entry.intervention) {
										        	return (<div key={i}></div>);
										        }
										      });
												})}
											</section>
								    </div>
					      	</section>
					      );
							})}
						</section>
		      </div>
		    </div>
		  );
	  }
	  return (
    	<div>
    		{this.renderMeasureBar(measures)}
    	</div>
    );
  },

  renderDataByTag: function(data, tags, tag) {
    var dataByTag = this.getDataByTag(tags, data);
    var tagDescriptions = this.state.tagDescriptions;

    return (
      <section key={tag} className='data'>
        <h2>
          <strong>{tagDescriptions[tag] ? tagDescriptions[tag].name_friendly : tag}</strong>
          {tagDescriptions[tag] && <p>{tagDescriptions[tag].description}</p>}
        </h2>
        <div>
          {this.renderTimelineByMeasure(dataByTag[tag])}
        </div>
      </section>
    );
  },

  handleMedicationSelect: function(key) {
    this.setState({
      selectedMedication: key
    });
  },

  renderMedicationBar: function(medications) {
  	var selectedMedication = this.state.selectedMedication;

    if (medications) {
      return (
        <Nav className='tag-navigation' bsStyle="pills" activeKey={selectedMedication && selectedMedication} onSelect={this.handleMedicationSelect}>
          {Object.keys(medications).map(function (medication, i) {
          	var medication = medications[medication];
            return (<NavItem key={i} eventKey={medication.name}>{medication.name_common}</NavItem>);
          })}
        </Nav>
      );
    }
  },

  handleTagSelect: function(key) {
    this.setState({
      selectedTag: key,
      selectedMeasure: null
    });
  },

  renderTagBar: function(tags) {
    var selectedTag = this.state.selectedTag;
    var tagDescriptions = this.state.tagDescriptions;

    if (tagDescriptions) {
      return (
        <Nav className='tag-navigation' bsStyle="pills" activeKey={selectedTag && selectedTag} onSelect={this.handleTagSelect}>
          {Object.keys(tags).map(function (tag, i) {
            return (<NavItem key={i} eventKey={tag}>{tagDescriptions[tag] ? tagDescriptions[tag].name_short : tag}</NavItem>);
          })}
        </Nav>
      );
    }
  },

  handleMeasureSelect: function(key) {
    this.setState({
      selectedMeasure: key
    });
  },

  renderMeasureBar: function(measures) {
    var selectedMeasure = this.state.selectedMeasure;
    var measureDescriptions = this.state.measures;

    return (
      <Nav className='tag-navigation' bsStyle="pills" activeKey={selectedMeasure && selectedMeasure} onSelect={this.handleMeasureSelect}>
        {Object.keys(measures).map(function (measure, i) {
          return (<NavItem key={i} eventKey={measure}>{measureDescriptions[measure] ? measureDescriptions[measure].name_short : measure}</NavItem>);
        })}
      </Nav>
    );
  },

  renderTimelineByTag: function(data, tags, tag) {
    var dataByTag = this.getDataByTag(tags, data);
    var tagDescriptions = this.state.tagDescriptions;

    if (2 > 3) {
	    return (
	      <section key={tag} className='data'>
	        <h2>
	          <strong>{tagDescriptions[tag] ? tagDescriptions[tag].name_friendly : tag}</strong>
	          {tagDescriptions[tag] && <p>{tagDescriptions[tag].description}</p>}
	        </h2>
	        <div>
	          {this.renderTimelineByMeasure(dataByTag[tag])}
	        </div>
	      </section>
	    );
	  }

		return (
			<div>
				<h2>
          <strong>{tagDescriptions[tag] ? tagDescriptions[tag].name_friendly : tag}</strong>
          {tagDescriptions[tag] && <p>{tagDescriptions[tag].description}</p>}
        </h2>
				{this.renderTimelineByMeasure(dataByTag[tag])}
	    </div>
		);
  },

  render: function() {
    var cx = React.addons.classSet;

    // Data-related
    var grades = this.state.grades;
    var measures = this.state.measures;
    var metrics = this.state.metrics;
    var tags = this.state.tags;
    var data = this.state.data;
    var selectedTag = this.state.selectedTag;

    // Medication filtering-related
    var medications = this.props.medications;
    var preferences = this.props.preferences;
    var risks = this.props.risks;
    var risksFriendly = this.props.risksFriendly;
    var disabledMedications = this.props.disabledMedications;
    var selectedMedication = this.state.selectedMedication;
    var medicationMap = this.state.medicationMap;

    var classes = cx({
      'processing': true
    });

    if (grades && measures && tags && data != {}) {
      return (
        <div className={classes}>
          <section>
            <h2>Live connection to <a href='https://docs.google.com/spreadsheets/d/1AR88Qq6YzOFdVPgl9nWspLJrZXEBMBINHSjGADJ6ph0/' target='_top'>data in a Google Spreadsheet</a></h2>
          </section>

          <section>
          	{this.renderTagBar(tags)}
          </section>

          {selectedTag && this.renderTimelineByTag(data, tags, selectedTag)}

        </div>
      );
    }
    return (<noscript />);
  }
});

module.exports = OutcomeTimeline;