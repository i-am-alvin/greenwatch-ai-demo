import axios from 'axios';

// EPA ECHO API URL
const ECHO_API_BASE = 'https://echo.epa.gov/api/echo';
const ECHO_API_ENFORCEMENTS = '/echo_rest_services.get_enforcement_case';

// 模擬數據
export const getCompanyBasicInfo = async (facilityId) => {
  const facilitiesData = {
    'formosa-plastics-tx': {
      name: '台塑塑膠股份有限公司 (德州廠)',
      englishName: 'Formosa Plastics Corporation, USA',
      facilityId: '110018925957',
      facilityName: '德州廠',
      facilityEnglishName: 'Texas Plant',
      address: '201 FORMOSA DRIVE, POINT COMFORT, TX 77978',
      industry: '石化產業',
      employeeCount: '約2,000人',
      carbonEmissions: '8.2百萬噸 (2022)',
      reportUrl: 'https://www.fpcusa.com/esg-report.html',
      foundedYear: '1978',
      parentCompany: '台塑集團',
      revenue: '約35億美元 (2022)'
    },
    'formosa-plastics-tw': {
      name: '台塑塑膠股份有限公司 (台灣廠)',
      englishName: 'Formosa Plastics Corporation, Taiwan',
      facilityId: 'TW-FPC-001',
      facilityName: '台灣廠',
      facilityEnglishName: 'Taiwan Plant',
      address: '雲林縣麥寮鄉台塑工業園區1號',
      industry: '石化產業',
      employeeCount: '約3,500人',
      carbonEmissions: '6.5百萬噸 (2022)',
      reportUrl: 'https://www.fpc.com.tw/esg-report.html',
      foundedYear: '1954',
      parentCompany: '台塑集團',
      revenue: '約420億新台幣 (2022)'
    },
    'nan-ya-plastics': { // Consolidated Nan Ya Plastics entry
      name: '南亞塑膠工業股份有限公司', // General name
      englishName: 'Nan Ya Plastics Corporation',
      facilityId: 'TW-NYP-001', // Using existing ID, can be a generic one
      facilityName: '所有廠區總覽', // General facility name
      facilityEnglishName: 'All Sites Overview',
      address: '台灣高雄市前鎮區中山三路33號 (總公司地址)', // Example: HQ address
      industry: '塑膠製造、化工、電子材料、聚酯纖維', // General industry
      employeeCount: 'N/A', // Or total employees if known
      carbonEmissions: 'N/A',
      reportUrl: 'https://www.npc.com.tw/csr-report', // Official CSR/ESG report URL
      foundedYear: '1958',
      parentCompany: '台塑集團',
      revenue: 'N/A' // Or total revenue if known
    },
    'evergreen-marine': {
      name: '長榮海運股份有限公司 (台北總部)',
      englishName: 'Evergreen Marine Corp.',
      facilityId: 'TW-EMC-001',
      facilityName: '台北總部',
      facilityEnglishName: 'Taipei Headquarters',
      address: '台北市松山區民生東路二段166號',
      industry: '航運業',
      employeeCount: '約1,800人',
      carbonEmissions: '4.2百萬噸 (2022)',
      reportUrl: 'https://www.evergreen-marine.com/esg-report.html',
      foundedYear: '1968',
      parentCompany: '長榮集團',
      revenue: '約520億新台幣 (2022)'
    },
    'china-steel': {
      name: '中國鋼鐵股份有限公司 (高雄廠)',
      englishName: 'China Steel Corporation',
      facilityId: 'TW-CSC-001',
      facilityName: '高雄廠',
      facilityEnglishName: 'Kaohsiung Plant',
      address: '高雄市小港區中鋼路1號',
      industry: '鋼鐵製造',
      employeeCount: '約9,500人',
      carbonEmissions: '10.5百萬噸 (2022)',
      reportUrl: 'https://www.csc.com.tw/esg-report.html',
      foundedYear: '1971',
      parentCompany: '中鋼集團',
      revenue: '約680億新台幣 (2022)'
    }
  };
  
  return facilitiesData[facilityId] || facilitiesData['nan-ya-plastics'];
};

// Helper to convert YYYYQTR to YYYY-MM-DD (start of quarter)
const convertYearQtrToDate = (yearQtr) => {
  if (!yearQtr || typeof yearQtr !== 'string' || yearQtr.length < 5) return 'N/A';
  const year = yearQtr.substring(0, 4);
  const quarter = yearQtr.substring(4, 5);
  let month;
  switch (quarter) {
    case '1': month = '01'; break;
    case '2': month = '04'; break;
    case '3': month = '07'; break;
    case '4': month = '10'; break;
    default: return `${year}-01-01`; // Fallback
  }
  return `${year}-${month}-01`;
};

// 獲取環境違規和罰款信息
export const getViolationData = async (companyId) => {
  const violationDataStore = {
    'nan-ya-plastics': [
      // Data from NAN_YA_PLASTICS_CAA_Violations_violations.csv
      {
        caseNumber: 'CAA-3600675654', // Added prefix for clarity
        date: '2015-10-26',
        type: 'Clean Air Act',
        description: 'State Implementation Plan for National Primary and Secondary Ambient Air Quality Standards - FACIL',
        status: 'Concluded', // Based on HPV_RESOLVED_DATE '10-26-2015'
        source: 'State Agency', // AGENCY_TYPE_DESC
        plantSite: 'Lake City, SC',
      },
      {
        caseNumber: 'CAA-3601384384',
        date: '2018-03-20',
        type: 'Clean Air Act',
        description: 'MACT Standards (40 CFR Part 63) - TOTAL HAZARDOUS AIR POLLUTANTS (HAPS)',
        status: 'Concluded', // Based on HPV_RESOLVED_DATE '08-20-2018'
        source: 'State Agency',
        plantSite: 'Lake City, SC',
      },

      // Data from NAN_YA_PLASTICS_CWA_Violations_violations.csv
      // Simplified due to lack of specific case numbers, descriptions, and status in source.
      // HLRNC codes (V,D,R,N,E,W,P) would ideally be mapped to meaningful status/descriptions.
      {
        caseNumber: 'CWA-110000353965-20164',
        date: convertYearQtrToDate('20164'),
        type: 'Clean Water Act',
        description: 'Compliance status: V (Violation)', // Using HLRNC code
        status: 'Unknown', // Status needs interpretation of HLRNC
        source: 'EPA Data',
        plantSite: 'Lake City, SC', // REGISTRY_ID 110000353965
      },
      {
        caseNumber: 'CWA-110000353965-20171',
        date: convertYearQtrToDate('20171'),
        type: 'Clean Water Act',
        description: 'Compliance status: V (Violation), 2 Violations This Qtr',
        status: 'Unknown',
        source: 'EPA Data',
        plantSite: 'Lake City, SC',
      },
      {
        caseNumber: 'CWA-110000353965-20193',
        date: convertYearQtrToDate('20193'),
        type: 'Clean Water Act',
        description: 'Compliance status: D (Violation)',
        status: 'Unknown',
        source: 'EPA Data',
        plantSite: 'Lake City, SC',
      },
      {
        caseNumber: 'CWA-110057188699-20141',
        date: convertYearQtrToDate('20141'),
        type: 'Clean Water Act',
        description: 'Compliance status: V (Violation)',
        status: 'Unknown',
        source: 'EPA Data',
        plantSite: 'Lake City, SC', // REGISTRY_ID 110057188699
      },
      {
        caseNumber: 'CWA-110057188699-20182',
        date: convertYearQtrToDate('20182'),
        type: 'Clean Water Act',
        description: 'Compliance status: E (Violation), 2 Violations This Qtr',
        status: 'Unknown',
        source: 'EPA Data',
        plantSite: 'Lake City, SC',
      },
      {
        caseNumber: 'CWA-110002066120-20192',
        date: convertYearQtrToDate('20192'),
        type: 'Clean Water Act',
        description: 'Compliance status: R (Reported Noncompliance), 3 Violations This Qtr',
        status: 'Unknown',
        source: 'EPA Data',
        plantSite: 'Batchelor, LA', // REGISTRY_ID 110002066120
      },
       {
        caseNumber: 'CWA-110002066120-20243',
        date: convertYearQtrToDate('20243'),
        type: 'Clean Water Act',
        description: 'Compliance status: V (Violation), 2 Violations This Qtr',
        status: 'Unknown',
        source: 'EPA Data',
        plantSite: 'Batchelor, LA',
      },
      // TODO: Add more parsed CWA records here if needed, following the pattern.
      // The CSV has many entries for CWA; this is a sample.

      // Data from NAN_YA_PLASTICS_RCRA_Violations_violations.csv
      {
        caseNumber: 'RCRA-110064116772-20190327-1',
        date: '2019-03-27',
        type: 'Resource Conservation and Recovery Act',
        description: 'State Statutory or Regulatory requirements that are broader-in-scope than the federal RCRA requirements',
        status: 'Concluded', // ACTUAL_RTC_DATE '04/24/2019'
        source: 'State Agency', // VIOL_DETERMINED_BY_AGENCY 'S'
        plantSite: 'Wharton, TX',
      },
      {
        caseNumber: 'RCRA-110000353965-20020829-1',
        date: '2002-08-29',
        type: 'Resource Conservation and Recovery Act',
        description: 'Standards Applicable to Generators of HW: General',
        status: 'Concluded', // ACTUAL_RTC_DATE '10/11/2002'
        source: 'State Agency',
        plantSite: 'Lake City, SC',
      },
      {
        caseNumber: 'RCRA-110064116772-20190327-2',
        date: '2019-03-27',
        type: 'Resource Conservation and Recovery Act',
        description: 'Standards Applicable to Recordkeeping and Reporting Applicable to Small and Large Quantity Generators',
        status: 'Concluded', // ACTUAL_RTC_DATE '04/24/2019'
        source: 'State Agency',
        plantSite: 'Wharton, TX',
      },
      {
        caseNumber: 'RCRA-110002066120-20050113-1',
        date: '2005-01-13',
        type: 'Resource Conservation and Recovery Act',
        description: 'Standards Applicable to Generators of HW: General',
        status: 'Concluded', // ACTUAL_RTC_DATE '03/10/2005'
        source: 'State Agency',
        plantSite: 'Batchelor, LA',
      },
      {
        caseNumber: 'RCRA-110002066120-20050113-2',
        date: '2005-01-13',
        type: 'Resource Conservation and Recovery Act',
        description: 'Standards Applicable to Generators of HW: Pre-Transport Requirements Applicable to Small and Large Quantity Generators',
        status: 'Concluded', // ACTUAL_RTC_DATE '01/13/2005'
        source: 'State Agency',
        plantSite: 'Batchelor, LA',
      },
    ],
    // Mock data for other companies remain unchanged
    'formosa-plastics-tx': [
        {
          caseNumber: 'TX-06-2017-0047',
          date: '2017-06-12',
          type: 'Clean Air Act',
          description: 'Violation of emission standards for hazardous air pollutants',
          status: 'Concluded',
          source: 'EPA Enforcement',
          plantSite: 'Point Comfort, TX', // Added for consistency
        },
        {
          caseNumber: 'TX-06-2019-0023',
          date: '2019-09-13',
          type: 'Clean Water Act',
          description: 'Discharge of plastic pellets into Lavaca Bay',
          status: 'Concluded',
          source: 'EPA Enforcement & State of Texas',
          plantSite: 'Point Comfort, TX',
        },
        {
          caseNumber: 'TX-06-2020-0011',
          date: '2020-03-15',
          type: 'Resource Conservation and Recovery Act',
          description: 'Improper storage of hazardous waste',
          status: 'Concluded',
          source: 'EPA Enforcement',
          plantSite: 'Point Comfort, TX',
        },
        {
          caseNumber: 'TX-06-2021-0034',
          date: '2021-11-08',
          type: 'Clean Air Act',
          description: 'Excess emissions during startup and shutdown events',
          status: 'Active',
          source: 'EPA Enforcement',
          plantSite: 'Point Comfort, TX',
        },
        {
          caseNumber: 'TX-06-2022-0018',
          date: '2022-07-22',
          type: 'Clean Water Act',
          description: 'Unauthorized discharge of wastewater',
          status: 'Active',
          source: 'EPA Enforcement',
          plantSite: 'Point Comfort, TX',
        }
      ],
      'formosa-plastics-tw': [
        {
          caseNumber: 'TW-FPC-2020-001',
          date: '2020-04-18',
          type: '空氣污染防制法',
          description: '揮發性有機物排放超標',
          status: 'Concluded',
          source: '環保署',
          plantSite: '麥寮廠, 台灣', // Added for consistency
        },
        {
          caseNumber: 'TW-FPC-2021-003',
          date: '2021-07-05',
          type: '水污染防治法',
          description: '廢水處理設施故障導致污水排放',
          status: 'Concluded',
          source: '環保署',
          plantSite: '麥寮廠, 台灣',
        }
      ],
      'evergreen-marine': [
        {
          caseNumber: 'TW-EMC-2021-001',
          date: '2021-09-30',
          type: '海洋污染防治法',
          description: '船舶廢油未妥善處理',
          status: 'Concluded',
          source: '海洋委員會',
          plantSite: '台北總部, 台灣', // Added for consistency
        }
      ],
      'china-steel': [
        {
          caseNumber: 'TW-CSC-2018-003',
          date: '2018-05-22',
          type: '空氣污染防制法',
          description: '粒狀污染物排放超標',
          status: 'Concluded',
          source: '環保署',
          plantSite: '高雄廠, 台灣', // Added for consistency
        },
        {
          caseNumber: 'TW-CSC-2019-001',
          date: '2019-08-14',
          type: '空氣污染防制法',
          description: '硫氧化物排放超標',
          status: 'Concluded',
          source: '環保署',
          plantSite: '高雄廠, 台灣',
        },
        {
          caseNumber: 'TW-CSC-2021-002',
          date: '2021-03-28',
          type: '水污染防治法',
          description: '重金屬廢水排放超標',
          status: 'Concluded',
          source: '環保署',
          plantSite: '高雄廠, 台灣',
        },
        {
          caseNumber: 'TW-CSC-2022-001',
          date: '2022-11-05',
          type: '空氣污染防制法',
          description: '氮氧化物排放超標',
          status: 'Active',
          source: '環保署',
          plantSite: '高雄廠, 台灣',
        }
      ]
  };
  
  if (companyId && violationDataStore[companyId]) {
    return violationDataStore[companyId];
  }
  // If specifically asking for nan-ya-plastics, or if no specific ID (though UI should pass one)
  if (companyId === 'nan-ya-plastics') {
     return violationDataStore['nan-ya-plastics'];
  }
  return []; // Default to empty if companyId is not found
};

// 獲取相關新聞
export const getRelatedNews = async (companyId) => {
  const newsData = {
    // ... (existing news data for other companies, ensure they also have plantSite if applicable)
    'formosa-plastics-tx': {
      international: [
        { title: 'Reuters: Formosa Plastics fined $50 million for Clean Water Act violations', date: '2019-10-15', source: 'Reuters', url: '#', plantSite: 'Point Comfort, TX' },
        { title: 'Bloomberg: Formosa Plastics Texas plant explosion injures several workers', date: '2021-05-03', source: 'Bloomberg', url: '#', plantSite: 'Point Comfort, TX' },
      ],
      domestic: [
        { title: 'Texas Tribune: Environmental groups sue Formosa over plastic pellet discharge', date: '2017-08-22', source: 'Texas Tribune', url: '#', plantSite: 'Point Comfort, TX' },
      ],
    },
    'nan-ya-plastics': { 
      international: [
        { title: 'Chemical & Engineering News: Nan Ya USA expands PET film capacity in South Carolina', date: '2018-07-19', source: 'C&EN', url: '#', plantSite: 'Lake City, SC'},
        { title: 'Plastics News: Nan Ya Plastics invests in new equipment for Wharton, TX facility', date: '2022-03-10', source: 'Plastics News', url: '#', plantSite: 'Wharton, TX'},
        { title: 'Global Chemical Report: Nan Ya\'s Batchelor LA site meets new environmental targets', date: '2023-01-15', source: 'Global Chemical Report', url: '#', plantSite: 'Batchelor, LA'},
        { title: 'Reuters: Nan Ya Plastics considers further expansion in US market', date: '2023-05-20', source: 'Reuters', url: '#', plantSite: 'All US Sites (General)' } 
      ],
      domestic: [ 
        { title: 'The State: Nan Ya Plastics plant in Lake City, SC faces scrutiny over air permits', date: '2019-05-01', source: 'The State', url: '#', plantSite: 'Lake City, SC'},
        { title: 'SCNow: Nan Ya USA recognized for community involvement in Florence County', date: '2022-11-15', source: 'SCNow', url: '#', plantSite: 'Lake City, SC'},
        { title: 'Baton Rouge Business Report: Nan Ya Louisiana facility announces job creation', date: '2021-08-03', source: 'Baton Rouge Business Report', url: '#', plantSite: 'Batchelor, LA'},
        { title: 'Pointe Coupee Banner: Local officials praise Nan Ya Batchelor\'s safety record', date: '2023-02-20', source: 'Pointe Coupee Banner', url: '#', plantSite: 'Batchelor, LA'},
        { title: 'Wharton Journal-Spectator: Nan Ya Texas contributes to local STEM education program', date: '2022-09-01', source: 'Wharton Journal-Spectator', url: '#', plantSite: 'Wharton, TX'},
        { title: 'Houston Chronicle: Manufacturing growth in Texas, Nan Ya Wharton plant highlighted', date: '2023-03-28', source: 'Houston Chronicle', url: '#', plantSite: 'Wharton, TX'}
      ],
    },
     'formosa-plastics-tw': {
      international: [
         { title: 'Focus Taiwan: Formosa Plastics Group invests in US expansion despite environmental concerns', date: '2023-01-20', source: 'Focus Taiwan', url: '#', plantSite: '台灣總部參考'},
      ],
      domestic: [
        { title: '經濟日報: 台塑麥寮廠區推動綠色製造獲肯定', date: '2022-10-10', source: '經濟日報', url: '#', plantSite: '麥寮廠, 台灣' },
      ],
    },
    'evergreen-marine': {
      international: [
        { title: 'Lloyd\'s List: Evergreen orders new eco-friendly container ships', date: '2023-03-15', source: 'Lloyd\'s List', url: '#', plantSite: '全球營運'},
      ],
      domestic: [
        { title: '中央社: 長榮海運公布最新永續發展報告書', date: '2023-06-01', source: '中央社', url: '#', plantSite: '台北總部, 台灣'},
      ],
    },
    'china-steel': {
      international: [
        { title: 'Metal Bulletin: China Steel faces rising raw material costs', date: '2023-02-25', source: 'Metal Bulletin', url: '#', plantSite: '全球市場影響'},
      ],
      domestic: [
        { title: '工商時報: 中鋼投入智慧製造，提升高雄廠效率與環保', date: '2022-12-05', source: '工商時報', url: '#', plantSite: '高雄廠, 台灣'},
      ],
    }
  };
  
  if (companyId && newsData[companyId]) {
    // Combine all news categories for the selected company if they exist
    const companyNews = newsData[companyId];
    let allNews = { international: [], domestic: [] };
    if (companyNews.international) allNews.international = [...allNews.international, ...companyNews.international];
    if (companyNews.domestic) allNews.domestic = [...allNews.domestic, ...companyNews.domestic];
    
    // Filter out duplicates if any by URL (simple check)
    allNews.international = allNews.international.filter((v,i,a)=>a.findIndex(t=>(t.url === v.url && t.title === v.title))===i);
    allNews.domestic = allNews.domestic.filter((v,i,a)=>a.findIndex(t=>(t.url === v.url && t.title === v.title))===i);

    return allNews;
  }
  return { international: [], domestic: [] };
};


// This function attempts to fetch real data but is not currently used by the main UI flow
// which relies on the mocked getCompanyBasicInfo, getViolationData, getRelatedNews.
export const fetchEchoEnforcementData = async (facilityId) => {
  if (!facilityId) {
    console.error("Facility ID is required to fetch ECHO enforcement data.");
    return null;
  }

  // Example: Constructing a QCR (Quarterly Compliance Report) URL, adjust as needed
  // This specific service might require more specific parameters based on what data you need.
  // The `qid` (Query ID) is often generated by a prior query.
  // For direct facility lookup, you might need a different ECHO service or parameters.
  // This is a placeholder for a more complex API interaction.
  
  // Let's try to get facility info first to see if we can link to cases
  // Using a simplified search based on registry ID if facilityId is one
  // Note: ECHO services are numerous and complex. This is a very basic example.
  const facilityInfoUrl = `${ECHO_API_BASE}/echo_rest_services.get_facility_info?output=JSON&p_id=${facilityId}`;

  try {
    const response = await axios.get(facilityInfoUrl);
    if (response.data && response.data.Results && response.data.Results.Facilities) {
      // Further calls would be needed to get specific enforcement cases using IDs from facility info
      // For now, just returning the facility info found
      return response.data.Results.Facilities;
    } else {
      console.log("No facilities found or unexpected API response structure from get_facility_info.");
      return null;
    }
  } catch (error) {
    console.error('Error fetching data from ECHO API:', error.message);
    if (error.response) {
      console.error('ECHO API Response Error Data:', error.response.data);
      console.error('ECHO API Response Error Status:', error.response.status);
    }
    return null;
  }
}; 