import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  Box, Container, Heading, Text, Tabs, TabList, TabPanels, Tab, TabPanel, 
  Table, Thead, Tbody, Tr, Th, Td, Badge, HStack, VStack, Link as ChakraLink, 
  SimpleGrid, Card, CardBody, Divider, Stack, Image, Skeleton, Stat, StatLabel, 
  StatNumber, StatHelpText, Icon, Breadcrumb, BreadcrumbItem, BreadcrumbLink
} from '@chakra-ui/react';
import { FaExternalLinkAlt, FaCalendarAlt, FaNewspaper, FaBuilding, FaMoneyBillWave, FaChevronRight } from 'react-icons/fa';
import { getCompanyBasicInfo, getViolationData, getRelatedNews } from '../../lib/api';
import Layout from '../../components/Layout';
import Link from 'next/link';

const CompanyDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [activeTab, setActiveTab] = useState(0);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [violationData, setViolationData] = useState([]);
  const [newsData, setNewsData] = useState({ international: [], domestic: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // 獲取基本信息
        const basicInfo = await getCompanyBasicInfo(id);
        setCompanyInfo(basicInfo);

        // 獲取違規數據
        const violations = await getViolationData(id);
        setViolationData(violations);

        // 獲取相關新聞
        const news = await getRelatedNews(id);
        setNewsData(news);
      } catch (error) {
        console.error('Error fetching company data:', error);
        router.push('/companies');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  if (!id || !companyInfo) {
    return (
      <Layout>
        <Container maxW="container.xl" py={10}>
          <VStack spacing={6} align="stretch">
            <Skeleton height="60px" />
            <Skeleton height="200px" />
            <Skeleton height="400px" />
          </VStack>
        </Container>
      </Layout>
    );
  }

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  // 違規類型的顏色配置
  const getViolationTypeColor = (type) => {
    switch (true) {
      case type.includes('Clean Air Act') || type.includes('空氣污染'): return 'red';
      case type.includes('Clean Water Act') || type.includes('水污染'): return 'blue';
      case type.includes('Resource Conservation') || type.includes('廢棄物'): return 'orange';
      case type.includes('海洋污染'): return 'cyan';
      default: return 'gray';
    }
  };

  // 違規狀態的顏色配置
  const getViolationStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'red';
      case 'Concluded': return 'green';
      default: return 'gray';
    }
  };

  return (
    <Layout>
      <Box bg="green.50" py={6}>
        <Container maxW="container.xl">
          <Breadcrumb spacing="8px" separator={<FaChevronRight color="gray.500" />}>
            <BreadcrumbItem>
              <Link href="/" legacyBehavior>
                <BreadcrumbLink>首頁</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <Link href="/companies" legacyBehavior>
                <BreadcrumbLink>企業列表</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <Link href="/companies" legacyBehavior>
                <BreadcrumbLink>{companyInfo.name.split(' (')[0]}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{companyInfo.facilityName}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Heading mt={4} color="green.600">{companyInfo.name}</Heading>
          <Text fontSize="lg" color="gray.600">{companyInfo.englishName}</Text>
        </Container>
      </Box>

      <Container maxW="container.xl" py={10}>
        {loading ? (
          <VStack spacing={8} align="stretch">
            <Skeleton height="60px" />
            <Skeleton height="200px" />
            <Skeleton height="400px" />
          </VStack>
        ) : (
          <VStack spacing={8} align="stretch">
            <Tabs variant="enclosed-colored" colorScheme="green" onChange={handleTabChange} isFitted>
              <TabList mb="1em">
                <Tab>基本ESG資訊</Tab>
                <Tab>相關新聞</Tab>
                <Tab>環境違規記錄</Tab>
              </TabList>

              <TabPanels>
                {/* 基本ESG資訊 Tab */}
                <TabPanel>
                  {companyInfo && (
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                      <Card variant="outline">
                        <CardBody>
                          <VStack align="start" spacing={4}>
                            <Heading size="md" color="green.600" mb={2}>基本資訊</Heading>
                            <Divider />
                            <SimpleGrid columns={2} width="100%" spacingY={4}>
                              <Box>
                                <Text fontWeight="bold" color="gray.600">公司名稱:</Text>
                              </Box>
                              <Box>
                                <Text>{companyInfo.name}</Text>
                              </Box>
                              
                              <Box>
                                <Text fontWeight="bold" color="gray.600">設施名稱:</Text>
                              </Box>
                              <Box>
                                <Text>{companyInfo.facilityName}</Text>
                              </Box>
                              
                              <Box>
                                <Text fontWeight="bold" color="gray.600">設施ID:</Text>
                              </Box>
                              <Box>
                                <Text>{companyInfo.facilityId}</Text>
                              </Box>
                              
                              <Box>
                                <Text fontWeight="bold" color="gray.600">地址:</Text>
                              </Box>
                              <Box>
                                <Text>{companyInfo.address}</Text>
                              </Box>
                              
                              <Box>
                                <Text fontWeight="bold" color="gray.600">產業:</Text>
                              </Box>
                              <Box>
                                <Text>{companyInfo.industry}</Text>
                              </Box>
                              
                              <Box>
                                <Text fontWeight="bold" color="gray.600">員工數:</Text>
                              </Box>
                              <Box>
                                <Text>{companyInfo.employeeCount}</Text>
                              </Box>
                              
                              <Box>
                                <Text fontWeight="bold" color="gray.600">成立年份:</Text>
                              </Box>
                              <Box>
                                <Text>{companyInfo.foundedYear}</Text>
                              </Box>
                              
                              <Box>
                                <Text fontWeight="bold" color="gray.600">母公司:</Text>
                              </Box>
                              <Box>
                                <Text>{companyInfo.parentCompany}</Text>
                              </Box>
                              
                              <Box>
                                <Text fontWeight="bold" color="gray.600">年營收:</Text>
                              </Box>
                              <Box>
                                <Text>{companyInfo.revenue}</Text>
                              </Box>
                            </SimpleGrid>
                          </VStack>
                        </CardBody>
                      </Card>

                      <Card variant="outline">
                        <CardBody>
                          <VStack align="start" spacing={4}>
                            <Heading size="md" color="green.600" mb={2}>環境表現</Heading>
                            <Divider />
                            
                            <SimpleGrid columns={1} width="100%" spacing={5}>
                              <Stat>
                                <StatLabel color="gray.600">碳排放量</StatLabel>
                                <StatNumber>{companyInfo.carbonEmissions}</StatNumber>
                                <StatHelpText>2022年數據</StatHelpText>
                              </Stat>

                              <Stat>
                                <StatLabel color="gray.600">近5年違規次數</StatLabel>
                                <StatNumber color={violationData.length > 3 ? "red.500" : "green.500"}>
                                  {violationData.length}
                                </StatNumber>
                                <StatHelpText>
                                  {violationData.length > 3 ? "高於行業平均" : "低於行業平均"}
                                </StatHelpText>
                              </Stat>

                              <Stat>
                                <StatLabel color="gray.600">罰款總金額</StatLabel>
                                <StatNumber>
                                  {violationData[0]?.amount?.includes('$') ? '$' : 'NT$'}
                                  {violationData.reduce((total, v) => {
                                    const amount = v.amount.replace(/[^\d]/g, '');
                                    return total + parseInt(amount) / (v.amount.includes('$') ? 1 : 100);
                                  }, 0).toLocaleString()}
                                </StatNumber>
                                <StatHelpText>累計金額</StatHelpText>
                              </Stat>

                              <Box mt={2}>
                                <Text fontWeight="bold" color="gray.600">ESG報告:</Text>
                                <ChakraLink href={companyInfo.reportUrl} isExternal color="green.500">
                                  查看最新ESG報告 <Icon as={FaExternalLinkAlt} boxSize="0.8em" ml={1} />
                                </ChakraLink>
                              </Box>
                            </SimpleGrid>
                          </VStack>
                        </CardBody>
                      </Card>
                    </SimpleGrid>
                  )}
                </TabPanel>

                {/* 相關新聞 Tab */}
                <TabPanel>
                  <Box mb={8}>
                    <Heading size="md" mb={4} color="green.600">國際新聞</Heading>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                      {newsData.international.length > 0 ? (
                        newsData.international.map(news => (
                          <Card key={news.id} h="100%">
                            <CardBody>
                              <VStack align="start" spacing={3}>
                                <Heading size="sm">{news.title}</Heading>
                                <HStack>
                                  <Icon as={FaNewspaper} />
                                  <Text fontSize="sm" color="gray.600">{news.source}</Text>
                                </HStack>
                                <HStack>
                                  <Icon as={FaCalendarAlt} />
                                  <Text fontSize="sm" color="gray.600">{news.date}</Text>
                                </HStack>
                              </VStack>
                            </CardBody>
                            <Divider />
                            <Box p={3}>
                              <ChakraLink href={news.url} isExternal color="green.500">
                                查看全文 <Icon as={FaExternalLinkAlt} boxSize="0.8em" ml={1} />
                              </ChakraLink>
                            </Box>
                          </Card>
                        ))
                      ) : (
                        <Box textAlign="center" py={5} width="100%">
                          <Text color="gray.500">目前沒有相關國際新聞</Text>
                        </Box>
                      )}
                    </SimpleGrid>
                  </Box>

                  <Box>
                    <Heading size="md" mb={4} color="green.600">國內新聞</Heading>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                      {newsData.domestic.length > 0 ? (
                        newsData.domestic.map(news => (
                          <Card key={news.id} h="100%">
                            <CardBody>
                              <VStack align="start" spacing={3}>
                                <Heading size="sm">{news.title}</Heading>
                                <HStack>
                                  <Icon as={FaNewspaper} />
                                  <Text fontSize="sm" color="gray.600">{news.source}</Text>
                                </HStack>
                                <HStack>
                                  <Icon as={FaCalendarAlt} />
                                  <Text fontSize="sm" color="gray.600">{news.date}</Text>
                                </HStack>
                              </VStack>
                            </CardBody>
                            <Divider />
                            <Box p={3}>
                              <ChakraLink href={news.url} isExternal color="green.500">
                                查看全文 <Icon as={FaExternalLinkAlt} boxSize="0.8em" ml={1} />
                              </ChakraLink>
                            </Box>
                          </Card>
                        ))
                      ) : (
                        <Box textAlign="center" py={5} width="100%">
                          <Text color="gray.500">目前沒有相關國內新聞</Text>
                        </Box>
                      )}
                    </SimpleGrid>
                  </Box>
                </TabPanel>

                {/* 環境違規記錄 Tab */}
                <TabPanel>
                  <Heading size="md" mb={4} color="green.600">環境違規和罰款記錄</Heading>
                  <Box overflowX="auto">
                    {violationData.length > 0 ? (
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>日期</Th>
                            <Th>案件編號</Th>
                            <Th>違規類型</Th>
                            <Th>描述</Th>
                            <Th>罰款金額</Th>
                            <Th>狀態</Th>
                            <Th>來源</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {violationData.map((violation, index) => (
                            <Tr key={index}>
                              <Td>{violation.date}</Td>
                              <Td>{violation.caseNumber}</Td>
                              <Td>
                                <Badge colorScheme={getViolationTypeColor(violation.type)}>
                                  {violation.type}
                                </Badge>
                              </Td>
                              <Td>{violation.description}</Td>
                              <Td>{violation.amount}</Td>
                              <Td>
                                <Badge colorScheme={getViolationStatusColor(violation.status)}>
                                  {violation.status}
                                </Badge>
                              </Td>
                              <Td>{violation.source}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    ) : (
                      <Box textAlign="center" py={10}>
                        <Text fontSize="lg">無違規記錄</Text>
                      </Box>
                    )}
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        )}
      </Container>
    </Layout>
  );
};

export default CompanyDetail; 