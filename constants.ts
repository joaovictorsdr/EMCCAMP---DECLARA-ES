
import { Project, Category } from './types';

// Helper to bold specific names within the text as requested
const highlightNames = (text: string) => {
  let processed = text;
  const namesToBold = [
    "EMCCAMP INCORPORAÇÃO SC 34 SPE LTDA",
    "DIOGO ROSSI DE LIMA CANO",
    "JOÃO VICTOR MICHEL",
    "JULIA DE OLIVEIRA LONGUINI"
  ];

  namesToBold.forEach(name => {
    // simple replaceAll equivalent for safety
    processed = processed.split(name).join(`<b>${name}</b>`);
  });
  return processed;
};

export const PROJECTS: Project[] = [
  {
    id: 'altus',
    name: 'Altus Vila Prudente',
    speName: 'EMCCAMP INCORPORAÇÃO SC 16 SPE LTDA',
    cnpj: '40.733.116/0001-54',
    cartorio: '06° Oficial de Registro de Imóveis da Comarca de São Paulo',
    matricula: '265.935',
    isMatriculaMae: false,
    qualificationText: highlightNames(`EMCCAMP INCORPORAÇÃO SC 16 SPE LTDA., com sede em Belo Horizonte/MG, na Rua Gonçalves Dias nº 744, sala 31, no bairro Savassi, Belo Horizonte/MG, inscrita no CNPJ 40.733.116/0001-54, conforme documentos constitutivos arquivados na Junta Comercial do Estado de Minas Gerais em 21/05/2024, registrada sob NIRE nº 31212083924, neste ato representada por seus procuradores: DIOGO ROSSI DE LIMA CANO, brasileiro, solteiro, arquiteto, RG nº 35.338.040-4 SSP/SP e CPF nº 367.679.408-79; e/ou JOÃO VICTOR MICHEL, brasileiro, casado, maior, supervisor de registro, RG nº 32.408.233-2 SSP/SP, CPF nº 214.297.848-73; e/ou JULIA DE OLIVEIRA LONGUINI, brasileira, solteira, maior, supervisora de repasse, RG nº 50.775.145-0 SSP/SP, CPF nº 129.265.416-35; conforme procuração lavrada em 23/01/2025, Folhas 164 a 170, do Livro 861-P, do Tabelionato de Notas e Registro Civil das Pessoas Naturais de Venda Nova; todos com endereço comercial à Rua Goncalves Dias, 744, Savassi, Belo Horizonte/MG.`),
    city: 'São Paulo',
    address: 'Rua Marcello Muller, 200 - Bairro Jardim Independência',
    registro: 'R.___'
  },
  {
    id: 'origem',
    name: 'Origem Itaquera',
    speName: 'EMCCAMP INCORPORAÇÃO SC 21 SPE LTDA',
    cnpj: '43.614.892/0001-23',
    cartorio: '9° Oficial de Registro de Imóveis da Comarca de São Paulo',
    matricula: '381.053',
    isMatriculaMae: true,
    qualificationText: highlightNames(`EMCCAMP INCORPORAÇÃO SC 21 SPE LTDA., com sede em Belo Horizonte/MG, na Rua Gonçalves Dias nº 744, sala 36, no bairro Funcionários, Belo Horizonte/MG, inscrita no CNPJ 43.614.892/0001-23, conforme documentos constitutivos arquivados na Junta Comercial do Estado de Minas Gerais em 16/05/2025 sob o nº 12816497, registrada sob NIRE nº 31212549524 , neste ato representada por seus procuradores: DIOGO ROSSI DE LIMA CANO, brasileiro, solteiro, arquiteto, RG nº 35.338.040-4 SSP/SP e CPF nº 367.679.408-79; e/ou JOÃO VICTOR MICHEL, brasileiro, casado, maior, supervisor de registro, RG nº 32.408.233-2 SSP/SP, CPF nº 214.297.848-73; e/ou JULIA DE OLIVEIRA LONGUINI, brasileira, solteira, maior, supervisora de repasse, RG nº 50.775.145-0 SSP/SP, CPF nº 129.265.416-35; conforme procuração lavrada em 23/01/2025, Folhas 164 a 170, do Livro 861-P, do Tabelionato de Notas e Registro Civil das Pessoas Naturais de Venda Nova; todos com endereço comercial à Rua Goncalves Dias, 744, Savassi, Belo Horizonte/MG.`),
    city: 'São Paulo',
    address: 'Rua Agrimensor Sugaya nº 842 - Bairro Colônia',
    registro: 'R.___'
  },
  {
    id: 'serena',
    name: 'Serena Residence',
    speName: 'EMCCAMP INCORPORAÇÃO SC 34 SPE LTDA',
    cnpj: '54.110.059/0001-61',
    cartorio: '12° Oficial de Registro de Imóveis da Comarca de São Paulo',
    matricula: '222.681',
    isMatriculaMae: true,
    qualificationText: highlightNames(`EMCCAMP INCORPORAÇÃO SC 34 SPE LTDA., com sede em Belo Horizonte/MG, na Rua Gonçalves Dias nº 744, sala 49, no bairro Funcionários, Belo Horizonte/MG, inscrita no CNPJ 54.110.059/0001-61, conforme documentos constitutivos arquivados na Junta Comercial do Estado de Minas Gerais em 28/02/2024, registrada sob NIRE nº 31214916583, neste ato representada por seus procuradores: DIOGO ROSSI DE LIMA CANO, brasileiro, solteiro, arquiteto, RG nº 35.338.040-4 SSP/SP e CPF nº 367.679.408-79; e/ou JOÃO VICTOR MICHEL, brasileiro, casado, maior, supervisor de registro, RG nº 32.408.233-2 SSP/SP, CPF nº 214.297.848-73; e/ou JULIA DE OLIVEIRA LONGUINI, brasileira, solteira, maior, supervisora de repasse, RG nº 50.775.145-0 SSP/SP, CPF nº 129.265.416-35; conforme procuração lavrada em 23/01/2025, Folhas 164 a 170, do Livro 861-P, do Tabelionato de Notas e Registro Civil das Pessoas Naturais de Venda Nova; todos com endereço comercial à Rua Goncalves Dias, 744, Savassi, Belo Horizonte/MG.`),
    city: 'São Paulo',
    address: 'Rua Nova Itarana nº 55 - Bairro Vila Silvia',
    registro: 'R.___'
  },
  {
    id: 'vision',
    name: 'Vision Penha',
    speName: 'EMCCAMP INCORPORAÇÃO SC 08 SPE LTDA',
    cnpj: '37.665.998/0001-53',
    cartorio: '12° Oficial de Registro de Imóveis da Comarca de São Paulo',
    matricula: '252.931',
    isMatriculaMae: true,
    qualificationText: highlightNames(`EMCCAMP INCORPORAÇÃO SC 08 SPE LTDA., com sede em Belo Horizonte/MG, na Rua Gonçalves Dias nº 744, sala 20, no bairro Funcionários, Belo Horizonte/MG, inscrita no CNPJ 37.665.998/0001-53, conforme documentos constitutivos arquivados na Junta Comercial do Estado de Minas Gerais em 09/07/2020, registrada sob NIRE nº 31211752954, neste ato representada por seus procuradores: DIOGO ROSSI DE LIMA CANO, brasileiro, solteiro, arquiteto, RG nº 35.338.040-4 SSP/SP e CPF nº 367.679.408-79; e/ou JOÃO VICTOR MICHEL, brasileiro, casado, maior, supervisor de registro, RG nº 32.408.233-2 SSP/SP, CPF nº 214.297.848-73; e/ou JULIA DE OLIVEIRA LONGUINI, brasileira, solteira, maior, supervisora de repasse, RG nº 50.775.145-0 SSP/SP, CPF nº 129.265.416-35; conforme procuração lavrada em 23/01/2025, Folhas 164 a 170, do Livro 861-P, do Tabelionato de Notas e Registro Civil das Pessoas Naturais de Venda Nova; todos com endereço comercial à Rua Goncalves Dias, 744, Savassi, Belo Horizonte/MG.`),
    city: 'São Paulo',
    address: 'Av. Amador Bueno da Veiga nº 1127 - Bairro Penha de França',
    registro: 'R.___'
  },
  {
    id: 'iconico',
    name: 'Icônico Jaraguá',
    speName: 'EMCCAMP INCORPORAÇÃO SC 32 SPE LTDA',
    cnpj: '44.763.499/0001-64',
    cartorio: '18° Oficial de Registro de Imóveis da Comarca de São Paulo',
    matricula: '301.154',
    isMatriculaMae: true,
    qualificationText: highlightNames(`EMCCAMP INCORPORAÇÃO SC 32 SPE LTDA., com sede em Belo Horizonte/MG, na Rua Gonçalves Dias nº 744, sala 49, no bairro Funcionários, Belo Horizonte/MG, inscrita no CNPJ 44.763.499/0001-64, conforme documentos constitutivos arquivados na Junta Comercial do Estado de Minas Gerais em 25/06/2024, registrada sob NIRE nº 31212771944, neste ato representada por seus procuradores: DIOGO ROSSI DE LIMA CANO, brasileiro, solteiro, arquiteto, RG nº 35.338.040-4 SSP/SP e CPF nº 367.679.408-79; e/ou JOÃO VICTOR MICHEL, brasileiro, casado, maior, supervisor de registro, RG nº 32.408.233-2 SSP/SP, CPF nº 214.297.848-73; e/ou JULIA DE OLIVEIRA LONGUINI, brasileira, solteira, maior, supervisora de repasse, RG nº 50.775.145-0 SSP/SP, CPF nº 129.265.416-35; conforme procuração lavrada em 23/01/2025, Folhas 164 a 170, do Livro 861-P, do Tabelionato de Notas e Registro Civil das Pessoas Naturais de Venda Nova; todos com endereço comercial à Rua Goncalves Dias, 744, Savassi, Belo Horizonte/MG.`),
    city: 'São Paulo',
    address: 'Rua Camocim de São Felix nº 38 - Bairro Jaraguá',
    registro: 'R.___'
  },
  {
    id: 'line',
    name: 'L1ne Parada Inglesa',
    speName: 'EMCCAMP INCORPORAÇÃO SC 35 SPE LTDA',
    cnpj: '54.109.242/0001-47',
    cartorio: '03° Oficial de Registro de Imóveis da Comarca de São Paulo',
    matricula: '173.197',
    isMatriculaMae: true,
    qualificationText: highlightNames(`EMCCAMP INCORPORAÇÃO SC 35 SPE LTDA., com sede em Belo Horizonte/MG, na Rua Gonçalves Dias nº 744, sala 52, no bairro Funcionários, Belo Horizonte/MG, inscrita no CNPJ 54.109.242/0001-47, conforme documentos constitutivos arquivados na Junta Comercial do Estado de Minas Gerais em 07/07/2025 sob o nº 12864183, registrada sob NIRE nº 31214916371, neste ato representada por seus procuradores: DIOGO ROSSI DE LIMA CANO, brasileiro, solteiro, arquiteto, RG nº 35.338.040-4 SSP/SP e CPF nº 367.679.408-79; e/ou JOÃO VICTOR MICHEL, brasileiro, casado, maior, supervisor de registro, RG nº 32.408.233-2 SSP/SP, CPF nº 214.297.848-73; e/ou JULIA DE OLIVEIRA LONGUINI, brasileira, solteira, maior, supervisora de repasse, RG nº 50.775.145-0 SSP/SP, CPF nº 129.265.416-35; conforme procuração lavrada em 23/01/2025, Folhas 164 a 170, do Livro 861-P, do Tabelionato de Notas e Registro Civil das Pessoas Naturais de Venda Nova; todos com endereço comercial à Rua Goncalves Dias, 744, Savassi, Belo Horizonte/MG.`),
    city: 'São Paulo',
    address: 'Rua do Tramway, nº 103 - Bairro Tucuruvi',
    registro: 'R.___'
  },
  {
    id: 'nostro',
    name: 'Nostro Mooca',
    speName: 'EMCCAMP INCORPORACAO SC 14 SPE LTDA',
    cnpj: '39.313.768/0001-50',
    cartorio: '07° Oficial de Registro de Imóveis da Comarca de São Paulo',
    matricula: '203.478',
    isMatriculaMae: false,
    qualificationText: highlightNames(`EMCCAMP INCORPORACAO SC 14 SPE LTDA., inscrita no CNPJ 39.313.768/0001-50, situada à Rua Goncalves Dias, 744, Savassi, Belo Horizonte/MG, com seus atos constitutivos arquivados na Junta Comercial do Estado de Minas Gerais em 20/06/2023, registrada sob NIRE nº 31211884231, neste ato representada por seus procuradores: DIOGO ROSSI DE LIMA CANO, brasileiro, solteiro, arquiteto, RG nº 35.338.040-4 SSP/SP e CPF nº 367.679.408-79; e/ou JOÃO VICTOR MICHEL, brasileiro, casado, maior, supervisor de registro, RG nº 32.408.233-2 SSP/SP, CPF nº 214.297.848-73; e/ou JULIA DE OLIVEIRA LONGUINI, brasileira, solteira, maior, supervisora de repasse, RG nº 50.775.145-0 SSP/SP, CPF nº 129.265.416-35; conforme procuração lavrada em 23/01/2025, Folhas 164 a 170, do Livro 861-P, do Tabelionato de Notas e Registro Civil das Pessoas Naturais de Venda Nova; todos com endereço comercial à Rua Goncalves Dias, 744, Savassi, Belo Horizonte/MG.`),
    city: 'São Paulo',
    address: 'Rua da Mooca, nº 1678 - Mooca',
    registro: 'R.___'
  },
  {
    id: 'villagio',
    name: 'Villagio dos Eucaliptos',
    speName: 'EMCCAMP INCORPORACAO SC 22 SPE LTDA',
    cnpj: '43.614.993/0001-02',
    cartorio: '01° Oficial de Registro de Imóveis, Títulos e Documentos e Civil de Pessoas Jurídicas de Jundiaí',
    matricula: '196.285',
    isMatriculaMae: true,
    qualificationText: highlightNames(`EMCCAMP INCORPORACAO SC 22 SPE LTDA., com sede em Belo Horizonte/MG, na Rua Gonçalves Dias nº 744, Sala 37, no bairro Funcionários, Belo Horizonte/MG, inscrita no CNPJ 43.614.993/0001-02, conforme documentos constitutivos arquivados na Junta Comercial do Estado de Minas Gerais em 28/04/2025, registrada sob NIRE nº 31212549575, neste ato representada por seus procuradores: DIOGO ROSSI DE LIMA CANO, brasileiro, solteiro, arquiteto, RG nº 35.338.040-4 SSP/SP e CPF nº 367.679.408-79; e/ou JOÃO VICTOR MICHEL, brasileiro, casado, maior, supervisor de registro, RG nº 32.408.233-2 SSP/SP, CPF nº 214.297.848-73; e/ou JULIA DE OLIVEIRA LONGUINI, brasileira, solteira, maior, supervisora de repasse, RG nº 50.775.145-0 SSP/SP, CPF nº 129.265.416-35; conforme procuração lavrada em 23/01/2025, Folhas 164 a 170, do Livro 861-P, do Cartório do Tabelionato de Notas e Registro Civil das Pessoas Naturais de Venda Nova/MG; todos com endereço comercial à Rua Goncalves Dias, 744, Savassi, Belo Horizonte/MG`),
    city: 'Jundiaí',
    address: 'Rua Primo Porcari esquina com Rua Alfredo Abaid - Bairro Medeiros',
    registro: 'R.___'
  },
  {
    id: 'soul',
    name: 'Soul Imigrantes',
    speName: 'EMCCAMP INCORPORACAO SC 09 SPE LTDA',
    cnpj: '37.667.467/0001-08',
    cartorio: 'Oficial de Registro de Imóveis de Diadema',
    matricula: '76.961',
    isMatriculaMae: true,
    qualificationText: highlightNames(`EMCCAMP INCORPORACAO SC 09 SPE LTDA., inscrita no CNPJ 37.667.467/0001-08, situada à Rua Goncalves Dias, 744, Savassi, Belo Horizonte/MG, com seus atos constitutivos arquivados na Junta Comercial do Estado de Minas Gerais em 09/07/2020, registrada sob NIRE nº 3121175306-3, neste ato representada por seus procuradores: DIOGO ROSSI DE LIMA CANO, brasileiro, solteiro, arquiteto, RG nº 35.338.040-4 SSP/SP e CPF nº 367.679.408-79; e/ou JOÃO VICTOR MICHEL, brasileiro, casado, maior, supervisor de registro, RG nº 32.408.233-2 SSP/SP, CPF nº 214.297.848-73; e/ou JULIA DE OLIVEIRA LONGUINI, brasileira, solteira, maior, supervisora de repasse, RG nº 50.775.145-0 SSP/SP, CPF nº 129.265.416-35; conforme procuração lavrada em 23/01/2025, Folhas 164 a 170, do Livro 861-P, do Tabelionato de Notas e Registro Civil das Pessoas Naturais de Venda Nova; todos com endereço comercial à Rua Goncalves Dias, 744, Savassi, Belo Horizonte/MG.`),
    city: 'Diadema',
    address: 'Rua Annita, nº 225 - Bairro Canhema',
    registro: 'R.___'
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'HIS-1',
    label: 'HIS-1',
    fullLabel: 'HABITAÇÃO DE INTERESSE SOCIAL (HIS-1)',
    incomeRangeText: 'inferior a R$4.700,00',
    valueLimit: 264000
  },
  {
    id: 'HIS-2',
    label: 'HIS-2',
    fullLabel: 'HABITAÇÃO DE INTERESSE SOCIAL (HIS-2)',
    incomeRangeText: 'inferior a R$4.700,01 X R$8.600,00',
    valueLimit: 350000
  },
  {
    id: 'HMP',
    label: 'HMP',
    fullLabel: 'HABITAÇÃO DE MERCADO POPULAR (HMP)',
    incomeRangeText: 'inferior a R$8.600,01 X R$12.000,00',
    valueLimit: 500000
  }
];
