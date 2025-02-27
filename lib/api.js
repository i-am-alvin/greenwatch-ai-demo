import axios from 'axios';

// EPA ECHO API URL
const ECHO_API_BASE = 'https://echo.epa.gov/api/echo';
const ECHO_API_ENFORCEMENTS = '/echo_rest_services.get_enforcement_case';

// 模擬數據 - 台塑德州廠的基本信息
export const getCompanyBasicInfo = async (facilityId) => {
  // 模擬資料 - 在實際應用中會從API獲取
  const facilitiesData = {
    'formosa-plastics-tx': {
      name: '台塑塑膠股份有限公司 (德州廠)',
      englishName: 'Formosa Plastics Corporation, USA',
      facilityId: '110018925957', // 德州廠的ID
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
    'nan-ya-plastics': {
      name: '南亞塑膠工業股份有限公司 (高雄廠)',
      englishName: 'Nan Ya Plastics Corporation',
      facilityId: 'TW-NYP-001',
      facilityName: '高雄廠',
      facilityEnglishName: 'Kaohsiung Plant',
      address: '高雄市林園區工業三路3號',
      industry: '塑膠製造',
      employeeCount: '約4,200人',
      carbonEmissions: '5.8百萬噸 (2022)',
      reportUrl: 'https://www.npc.com.tw/esg-report.html',
      foundedYear: '1958',
      parentCompany: '台塑集團',
      revenue: '約380億新台幣 (2022)'
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
  
  return facilitiesData[facilityId] || facilitiesData['formosa-plastics-tx'];
};

// 獲取環境違規和罰款信息
export const getViolationData = async (companyId) => {
  try {
    // 模擬數據 - 台塑德州廠的違規記錄
    const violationData = {
      'formosa-plastics-tx': [
        {
          caseNumber: 'TX-06-2017-0047',
          date: '2017-06-12',
          type: 'Clean Air Act',
          description: 'Violation of emission standards for hazardous air pollutants',
          amount: '$2,850,000',
          status: 'Concluded',
          source: 'EPA Enforcement',
        },
        {
          caseNumber: 'TX-06-2019-0023',
          date: '2019-09-13',
          type: 'Clean Water Act',
          description: 'Discharge of plastic pellets into Lavaca Bay',
          amount: '$50,000,000',
          status: 'Concluded',
          source: 'EPA Enforcement & State of Texas',
        },
        {
          caseNumber: 'TX-06-2020-0011',
          date: '2020-03-15',
          type: 'Resource Conservation and Recovery Act',
          description: 'Improper storage of hazardous waste',
          amount: '$380,000',
          status: 'Concluded',
          source: 'EPA Enforcement',
        },
        {
          caseNumber: 'TX-06-2021-0034',
          date: '2021-11-08',
          type: 'Clean Air Act',
          description: 'Excess emissions during startup and shutdown events',
          amount: '$1,250,000',
          status: 'Active',
          source: 'EPA Enforcement',
        },
        {
          caseNumber: 'TX-06-2022-0018',
          date: '2022-07-22',
          type: 'Clean Water Act',
          description: 'Unauthorized discharge of wastewater',
          amount: '$750,000',
          status: 'Active',
          source: 'EPA Enforcement',
        }
      ],
      'formosa-plastics-tw': [
        {
          caseNumber: 'TW-FPC-2020-001',
          date: '2020-04-18',
          type: '空氣污染防制法',
          description: '揮發性有機物排放超標',
          amount: 'NT$1,200,000',
          status: 'Concluded',
          source: '環保署',
        },
        {
          caseNumber: 'TW-FPC-2021-003',
          date: '2021-07-05',
          type: '水污染防治法',
          description: '廢水處理設施故障導致污水排放',
          amount: 'NT$800,000',
          status: 'Concluded',
          source: '環保署',
        }
      ],
      'nan-ya-plastics': [
        {
          caseNumber: 'TW-NYP-2019-002',
          date: '2019-11-20',
          type: '空氣污染防制法',
          description: '工廠煙囪排放超標',
          amount: 'NT$1,500,000',
          status: 'Concluded',
          source: '環保署',
        },
        {
          caseNumber: 'TW-NYP-2020-001',
          date: '2020-03-08',
          type: '廢棄物清理法',
          description: '事業廢棄物未妥善處理',
          amount: 'NT$900,000',
          status: 'Concluded',
          source: '環保署',
        },
        {
          caseNumber: 'TW-NYP-2022-002',
          date: '2022-06-15',
          type: '水污染防治法',
          description: '放流水超標',
          amount: 'NT$1,100,000',
          status: 'Active',
          source: '環保署',
        }
      ],
      'evergreen-marine': [
        {
          caseNumber: 'TW-EMC-2021-001',
          date: '2021-09-30',
          type: '海洋污染防治法',
          description: '船舶廢油未妥善處理',
          amount: 'NT$500,000',
          status: 'Concluded',
          source: '海洋委員會',
        }
      ],
      'china-steel': [
        {
          caseNumber: 'TW-CSC-2018-003',
          date: '2018-05-22',
          type: '空氣污染防制法',
          description: '粒狀污染物排放超標',
          amount: 'NT$2,000,000',
          status: 'Concluded',
          source: '環保署',
        },
        {
          caseNumber: 'TW-CSC-2019-001',
          date: '2019-08-14',
          type: '空氣污染防制法',
          description: '硫氧化物排放超標',
          amount: 'NT$1,800,000',
          status: 'Concluded',
          source: '環保署',
        },
        {
          caseNumber: 'TW-CSC-2021-002',
          date: '2021-03-28',
          type: '水污染防治法',
          description: '重金屬廢水排放超標',
          amount: 'NT$1,500,000',
          status: 'Concluded',
          source: '環保署',
        },
        {
          caseNumber: 'TW-CSC-2022-001',
          date: '2022-11-05',
          type: '空氣污染防制法',
          description: '氮氧化物排放超標',
          amount: 'NT$1,200,000',
          status: 'Active',
          source: '環保署',
        }
      ]
    };
    
    return violationData[companyId] || [];
  } catch (error) {
    console.error('Error fetching violation data:', error);
    return [];
  }
};

// 獲取相關新聞
export const getRelatedNews = async (companyId) => {
  // 模擬數據 - 相關新聞
  const newsData = {
    'formosa-plastics-tx': {
      international: [
        {
          id: 1,
          title: 'Formosa Plastics to pay $50M for polluting Texas waters',
          source: 'Reuters',
          date: '2019-10-15',
          url: 'https://www.reuters.com/article/us-formosa-plastics-texas/formosa-plastics-to-pay-50-million-for-texas-plastic-pollution-judge-approves-idUSKBN1X01JH',
        },
        {
          id: 2,
          title: 'EPA fines Formosa Plastics $2.85M for air pollution violations',
          source: 'Environmental News Service',
          date: '2017-07-26',
          url: '#',
        },
        {
          id: 3,
          title: 'Environmental groups sue Formosa Plastics over plastic pollution',
          source: 'The Guardian',
          date: '2022-03-18',
          url: '#',
        },
      ],
      domestic: [
        {
          id: 1,
          title: '台塑德州廠因空氣污染遭罰款2.85億台幣',
          source: '自由時報',
          date: '2017-07-27',
          url: '#',
        },
        {
          id: 2,
          title: '台塑在美國的環保問題：德州廠的環境爭議',
          source: '環境資訊中心',
          date: '2020-01-15',
          url: '#',
        },
        {
          id: 3,
          title: '台塑德州廠承諾投資10億美元升級環保設施',
          source: '經濟日報',
          date: '2022-06-10',
          url: '#',
        },
      ]
    },
    'formosa-plastics-tw': {
      international: [
        {
          id: 1,
          title: 'Taiwan\'s Formosa Plastics fined for pollution violations',
          source: 'Chemical & Engineering News',
          date: '2020-05-20',
          url: '#',
        }
      ],
      domestic: [
        {
          id: 1,
          title: '台塑雲林廠排放超標 環保署開罰120萬',
          source: '中央社',
          date: '2020-04-20',
          url: '#',
        },
        {
          id: 2,
          title: '台塑集團承諾2050年達碳中和',
          source: '工商時報',
          date: '2022-03-22',
          url: '#',
        }
      ]
    },
    'nan-ya-plastics': {
      international: [
        {
          id: 1,
          title: 'Nan Ya Plastics expands recycling capacity amid environmental concerns',
          source: 'Plastics Today',
          date: '2021-08-15',
          url: '#',
        }
      ],
      domestic: [
        {
          id: 1,
          title: '南亞高雄廠違反空污法 環保局開罰150萬',
          source: '自由時報',
          date: '2019-11-25',
          url: '#',
        },
        {
          id: 2,
          title: '南亞塑膠投資綠能產業 5年內投入百億',
          source: '經濟日報',
          date: '2022-02-10',
          url: '#',
        },
        {
          id: 3,
          title: '南亞廢水處理違規 環保署啟動專案稽查',
          source: '環境資訊中心',
          date: '2022-06-18',
          url: '#',
        }
      ]
    },
    'evergreen-marine': {
      international: [
        {
          id: 1,
          title: 'Evergreen Marine pledges to reduce carbon emissions by 30% by 2025',
          source: 'The Maritime Executive',
          date: '2021-04-22',
          url: '#',
        }
      ],
      domestic: [
        {
          id: 1,
          title: '長榮海運推動綠色航運 獲國際環保認證',
          source: '中央社',
          date: '2021-05-10',
          url: '#',
        }
      ]
    },
    'china-steel': {
      international: [
        {
          id: 1,
          title: 'China Steel Corporation announces carbon reduction plan',
          source: 'Steel Times International',
          date: '2021-11-30',
          url: '#',
        }
      ],
      domestic: [
        {
          id: 1,
          title: '中鋼高雄廠空污排放超標 環保局連開4張罰單',
          source: '自由時報',
          date: '2019-08-20',
          url: '#',
        },
        {
          id: 2,
          title: '中鋼投入百億元 改善空污排放',
          source: '工商時報',
          date: '2021-04-05',
          url: '#',
        },
        {
          id: 3,
          title: '中鋼2050年淨零碳排藍圖公布 擬投資5,000億',
          source: '經濟日報',
          date: '2022-09-15',
          url: '#',
        }
      ]
    }
  };
  
  return newsData[companyId] || { international: [], domestic: [] };
};

// 這個函數在實際應用中會使用EPA API獲取數據
export const fetchEchoEnforcementData = async (facilityId) => {
  try {
    // 實際的API調用會像這樣:
    /* 
    const response = await axios.get(`${ECHO_API_BASE}${ECHO_API_ENFORCEMENTS}`, {
      params: {
        output: 'JSON',
        p_id: facilityId,
        p_limit: '50'
      }
    });
    return response.data;
    */
    
    // 目前我們返回模擬數據
    return getViolationData('formosa-plastics-tx');
  } catch (error) {
    console.error('Error fetching EPA data:', error);
    throw error;
  }
}; 