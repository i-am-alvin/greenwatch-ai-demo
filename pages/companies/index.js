import { useState } from 'react';
import { Box, Container, Heading, Text, Grid, GridItem, VStack, HStack, Badge, Card, CardBody, Stack, Divider, CardFooter, Button, Image, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch, FaIndustry } from 'react-icons/fa';
import Link from 'next/link';
import Layout from '../../components/Layout';

// 模擬企業數據
const companiesData = [
  {
    id: 'formosa-plastics-tx',
    name: '台塑塑膠股份有限公司 (德州廠)',
    englishName: 'Formosa Plastics Corporation, Texas',
    industry: '石化產業',
    location: '美國, 德州',
    riskLevel: 'high',
    recentViolations: 5,
    image: 'https://via.placeholder.com/150?text=FPC'
  },
  {
    id: 'formosa-plastics-tw',
    name: '台塑塑膠股份有限公司 (台灣廠)',
    englishName: 'Formosa Plastics Corporation, Taiwan',
    industry: '石化產業',
    location: '台灣, 雲林',
    riskLevel: 'medium',
    recentViolations: 2,
    image: 'https://via.placeholder.com/150?text=FPC'
  },
  {
    id: 'nan-ya-plastics',
    name: '南亞塑膠工業股份有限公司',
    englishName: 'Nan Ya Plastics Corporation',
    industry: '塑膠製造',
    location: '台灣, 高雄',
    riskLevel: 'medium',
    recentViolations: 3,
    image: 'https://via.placeholder.com/150?text=NYP'
  },
  {
    id: 'evergreen-marine',
    name: '長榮海運股份有限公司',
    englishName: 'Evergreen Marine Corp.',
    industry: '航運業',
    location: '台灣, 台北',
    riskLevel: 'low',
    recentViolations: 1,
    image: 'https://via.placeholder.com/150?text=EMC'
  },
  {
    id: 'china-steel',
    name: '中國鋼鐵股份有限公司',
    englishName: 'China Steel Corporation',
    industry: '鋼鐵製造',
    location: '台灣, 高雄',
    riskLevel: 'high',
    recentViolations: 4,
    image: 'https://via.placeholder.com/150?text=CSC'
  }
];

const CompanyCard = ({ company }) => {
  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  const getRiskText = (risk) => {
    switch (risk) {
      case 'high': return '高風險';
      case 'medium': return '中風險';
      case 'low': return '低風險';
      default: return '未評估';
    }
  };

  return (
    <Card boxShadow="md" borderRadius="lg" h="100%">
      <CardBody>
        <Image
          src={company.image}
          alt={company.name}
          borderRadius="lg"
          height="150px"
          width="100%"
          objectFit="cover"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{company.name}</Heading>
          <Text color="gray.600" fontSize="sm">{company.englishName}</Text>
          <HStack>
            <FaIndustry />
            <Text color="gray.600">{company.industry}</Text>
          </HStack>
          <Text color="gray.600">{company.location}</Text>
          <HStack>
            <Badge colorScheme={getRiskColor(company.riskLevel)} px={2} py={1} borderRadius="full">
              {getRiskText(company.riskLevel)}
            </Badge>
            {company.recentViolations > 0 && (
              <Badge colorScheme="red" px={2} py={1} borderRadius="full">
                近期違規: {company.recentViolations}
              </Badge>
            )}
          </HStack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link href={`/companies/${company.id}`} legacyBehavior>
          <Button as="a" colorScheme="green" w="100%">
            查看詳情
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState(companiesData);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredCompanies(companiesData);
    } else {
      const filtered = companiesData.filter(company => 
        company.name.toLowerCase().includes(term.toLowerCase()) ||
        company.englishName.toLowerCase().includes(term.toLowerCase()) ||
        company.industry.toLowerCase().includes(term.toLowerCase()) ||
        company.location.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  };

  return (
    <Layout>
      <Box bg="green.50" py={6}>
        <Container maxW="container.xl">
          <Heading color="green.600">企業環境監測列表</Heading>
          <Text color="gray.600" mt={2}>
            瀏覽和搜索企業的環境表現、違規記錄和ESG評級
          </Text>
        </Container>
      </Box>
      
      <Container maxW="container.xl" py={10}>
        <VStack spacing={8} align="stretch">
          <Box mb={6}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaSearch color="gray.300" />
              </InputLeftElement>
              <Input 
                placeholder="搜索企業名稱、行業或地區" 
                value={searchTerm}
                onChange={handleSearch}
                borderRadius="md"
                bg="white"
              />
            </InputGroup>
          </Box>

          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
            {filteredCompanies.map(company => (
              <GridItem key={company.id}>
                <CompanyCard company={company} />
              </GridItem>
            ))}
          </Grid>
          
          {filteredCompanies.length === 0 && (
            <Box textAlign="center" py={10} bg="white" rounded="md" shadow="sm" p={6}>
              <Text fontSize="lg">沒有找到符合的企業，請嘗試其他搜索詞</Text>
            </Box>
          )}
        </VStack>
      </Container>
    </Layout>
  );
} 