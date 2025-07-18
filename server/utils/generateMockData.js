const industries = ['Technology', 'Finance', 'Healthcare', 'Retail', 'Energy', 'Manufacturing'];
const reportTypes = ['Market Analysis', 'Financial Forecast', 'Competitor Intelligence', 'Risk Assessment', 'Strategic Recommendation'];
const confidenceLevels = [75, 80, 85, 90, 95]; // Higher confidence scores

const sources = [
  { 
    name: 'Global Market Insights', 
    type: 'Research Report', 
    reliability: 92 
  },
  { 
    name: 'Internal Sales Data', 
    type: 'Internal Database', 
    reliability: 95 
  },
  { 
    name: 'Consumer Survey Q3', 
    type: 'Survey Data', 
    reliability: 87 
  },
  { 
    name: 'SEC Filings', 
    type: 'Public Records', 
    reliability: 98 
  },
  { 
    name: 'Expert Interview Transcript', 
    type: 'Qualitative Research', 
    reliability: 89 
  }
];

const generateMockReports = (count = 10) => {
  const reports = [];
  
  for (let i = 1; i <= count; i++) {
    const reportId = `report-${i.toString().padStart(3, '0')}`;
    const reportType = reportTypes[Math.floor(Math.random() * reportTypes.length)];
    const industry = industries[Math.floor(Math.random() * industries.length)];
    const confidenceScore = confidenceLevels[Math.floor(Math.random() * confidenceLevels.length)];
    
    // Random source selection (2-4 sources per report)
    const reportSources = [];
    const sourceCount = 2 + Math.floor(Math.random() * 3);
    const usedIndices = new Set();
    
    while (reportSources.length < sourceCount) {
      const idx = Math.floor(Math.random() * sources.length);
      if (!usedIndices.has(idx)) {
        usedIndices.add(idx);
        reportSources.push({
          ...sources[idx],
          id: `source-${reportSources.length + 1}`,
          date: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        });
      }
    }
    
    reports.push({
      id: reportId,
      title: `${reportType}: ${industry} Sector`,
      summary: `Comprehensive analysis of emerging trends and strategic opportunities in the ${industry.toLowerCase()} sector. This report identifies key growth drivers and provides actionable recommendations for market leadership.`,
      confidenceScore,
      reportType,
      industry,
      sources: reportSources,
      lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      keyInsights: [
        `Market growth projected at ${Math.floor(Math.random() * 15) + 8}% CAGR through 2027`,
        `Top 3 competitors control ${Math.floor(Math.random() * 30) + 45}% market share`,
        `Regulatory changes create ${Math.random() > 0.5 ? 'opportunities' : 'challenges'} in Q4`,
        `Consumer preference shift toward ${['sustainability', 'digital experiences', 'value pricing'][Math.floor(Math.random() * 3)]}`
      ]
    });
  }
  
  return reports;
};

module.exports = generateMockReports;