'use client';
import Image from 'next/image';
import styles from './page.module.css';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React from 'react';
// import { motion } from 'framer-motion';
import Papa from 'papaparse';
import ButtonComponent from '@/components/button';

export default function Home() {
  const [csv, setCsv] = React.useState('');
  const [csvFile, setCsvFile] = React.useState<File>();
  const [json, setJson] = React.useState('');
  const [space, setSpace] = React.useState(2);

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCsv(e.target.value);
    // setJson(e.target.value);
  };
  const handleConvert = () => {
    const csvToJson = (csv: string) => {
      const lines = csv.split('\n');
      const headers = lines[0].split(',');
      const jsonArray = [];

      for (let i = 1; i < lines.length; i++) {
        const obj = {};
        const currentLine = lines[i].split(',');
        // @ts-ignore
        for (let j = 0; j < headers.length; j++) {
          // @ts-ignore
          obj[headers[j]] = currentLine[j] || '';
        }

        jsonArray.push(obj);
      }

      return jsonArray;
    };

    const csvString = `header1,header2,header3
    value1,value2,value3
    value4,value5,value6`;

    if (csv && !csvFile) {
      const jsonData = csvToJson(csv);
      setJson(JSON.stringify(jsonData, null, 4));
    }

    if (csvFile) {
      convertCsvFile();
    }
  };

  const convertCsvFile = () => {
    if (!csvFile) return;

    Papa.parse(csvFile, {
      header: true,
      complete: (result) => {
        console.log(result);
        setJson(JSON.stringify(result.data, null, space));
      },
    });
  };

  const formatJsonData = (data: string) => {
    const jsonData = JSON.parse(data);
    setJson(JSON.stringify(jsonData, null, space));
  };

  const minifyJsonData = (data: string) => {
    const jsonData = JSON.parse(data);
    setJson(JSON.stringify(jsonData, null, 0));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCsvFile(e.target.files[0]);
    }
  };

  const handleDisableConvertButton = () => {
    if (!csvFile && !csv) {
      return true;
    }

    return false;
  };

  return (
    <Box as='main' py={4} px={8} h={'100vh'}>
      <Box as='header' fontSize={21} fontWeight={600} mb={8}>
        <Text>
          {'{ '}
          CSV {' > '}
          <Text as='span' color='teal.500'>
            JSON
          </Text>
          {' } '}
        </Text>
      </Box>
      <Flex
        as='section'
        mt={4}
        flex={2}
        flexDir={'row'}
        justifyContent={'space-between'}
        gap={4}
        // bg={'gray.300'}
        h={'90%'}
      >
        <Box as='aside' w={'100%'}>
          <InputGroup mb={4}>
            <InputLeftAddon>Upload CSV file</InputLeftAddon>
            <Input
              type='file'
              accept='.csv'
              pt={1}
              onChange={handleFileChange}
            />
          </InputGroup>
          <Text as={'p'} textAlign={'center'} mb={4} fontWeight={600}>
            Or
          </Text>
          <Textarea
            placeholder='Paste CSV here'
            value={csv}
            onChange={handleChange}
            h={'89.5%'}
          />
        </Box>
        <Box w={'30%'} px={4} py={2} rounded={'md'} bg={'gray.100'}>
          <ButtonComponent
            buttonName='Convert'
            onClick={handleConvert}
            disabled={handleDisableConvertButton()}
          />

          <Select
            placeholder='Select option'
            mt={4}
            colorScheme='teal'
            background={'transparent'}
            color={'teal.600'}
            onChange={(e) => setSpace(Number(e.target.value))}
          >
            <option value='2' defaultChecked>
              2 Tab Spaces
            </option>
            <option value='3'>3 Tab Spaces</option>
            <option value='4'>4 Tab Spaces</option>
          </Select>

          <ButtonComponent
            buttonName='Format JSON'
            onClick={() => {
              formatJsonData(json);
            }}
            disabled={!json}
          />
          <ButtonComponent
            buttonName='Minify JSON'
            onClick={() => {
              minifyJsonData(json);
            }}
            disabled={!json}
          />

          <ButtonComponent
            buttonName='Buy me a coffee'
            onClick={() => {
              window.open('https://www.buymeacoffee.com/marvelcodes');
            }}
            // disabled={!json}
          />
        </Box>

        <Box as='main' w={'100%'}>
          <Textarea placeholder='Expect Result here' value={json} h={'100%'} />{' '}
        </Box>
      </Flex>
    </Box>
  );
}
