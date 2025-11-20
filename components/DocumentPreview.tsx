
import React from 'react';
import { FormData, Project, Category } from '../types';

interface DocumentPreviewProps {
  data: FormData & { showClient2?: boolean };
  project: Project | undefined;
  category: Category | undefined;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ data, project, category }) => {
  if (!project) return <div className="p-10 text-gray-400 text-center">Selecione um empreendimento</div>;

  // Use custom income text if provided, otherwise use category default
  const incomeText = data.customIncomeText || category?.incomeRangeText || '';

  // Helper to safely render HTML for bolding names
  const renderHTML = (html: string) => {
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  };

  // Helper to format client qualification: Bold text before first comma, normal after
  const formatClientQualification = (text: string) => {
    if (!text) return <b>&lt;QUALIFICAÇÃO DO CLIENTE&gt;</b>;
    
    // Find the index of the first comma
    const firstCommaIndex = text.indexOf(',');
    
    if (firstCommaIndex === -1) {
      // No comma, bold everything
      return <b>{text}</b>;
    }

    const names = text.substring(0, firstCommaIndex);
    const rest = text.substring(firstCommaIndex);

    return (
      <>
        <b>{names}</b>{rest}
      </>
    );
  };

  // Document 3 Logic Helpers
  const isPlural = !!(data.client2Name && data.client2Name.trim().length > 0);
  const pronouns = {
    I: isPlural ? 'Nós' : 'Eu',
    my: isPlural ? 'nossa' : 'minha',
    declare: isPlural ? 'declaramos' : 'declaro',
    owner: isPlural ? 'proprietários' : 'proprietário',
    have: isPlural ? 'temos' : 'tenho',
    ratify: isPlural ? 'ratificamos' : 'ratifico',
    firm: isPlural ? 'firmamos' : 'firmo',
  };

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white mx-auto p-[25mm] relative text-[11pt] leading-snug text-black text-justify font-['Archivo_Narrow'] print:m-0 print:w-full print:h-full box-border">
      
      {/* 
        ===========================================================
        DOCUMENT 1: DESENQUADRAMENTO MCMV
        ===========================================================
      */}
      {data.docType === 'desenquadramento' && (
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="mb-10 font-bold uppercase text-center">
              ILUSTRÍSSIMO SENHOR DOUTOR DO {project.cartorio}
            </div>

            <div className="mb-6">
              {/* Qualification */}
              <div className="mb-8">
                 {renderHTML(project.qualificationText)}
              </div>

              <div className="mb-4">
                Na qualidade de proprietária e incorporadora do empreendimento denominado <b>{project.name}</b>, 
                objeto da matrícula {project.isMatriculaMae ? 'mãe' : ''} nº {project.matricula}
                {data.matriculaOverride ? `, e matrícula individualizada nº ${data.matriculaOverride}` : ''} 
                {' '}do {project.cartorio}, vem requerer a V.Sa. a averbação do <b>DESENQUADRAMENTO</b> do imóvel 
                referente a {project.id === 'villagio' ? (
                   <>Casa <b>{data.houseNumber}</b></>
                ) : (
                   <>unidade <b>{data.unitNumber}</b>{data.towerName ? `, Torre ${data.towerName}` : ''}</>
                )}, 
                do <b>PROGRAMA MINHA CASA MINHA VIDA - PMCMV</b>.
              </div>

              <div className="mb-4">
                A presente solicitação atende ao disposto na legislação vigente.
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <div className="text-center mb-12">
              {project.city}, {data.day} de {data.month} de {data.year}
            </div>

            <div className="text-center w-full flex flex-col items-center">
               <div className="w-[80%] border-t border-black mb-2"></div>
               <div className="font-bold">{project.speName}</div>
               <div>CNPJ: {project.cnpj}</div>
            </div>
          </div>
        </div>
      )}


      {/* 
        ===========================================================
        DOCUMENT 2: ENQUADRAMENTO CATEGORIA DE USO
        ===========================================================
      */}
      {data.docType === 'enquadramento' && category && (
        <div className="flex flex-col h-full">
           <div className="text-center font-bold uppercase underline mb-10">
              CERTIDÃO DE ENQUADRAMENTO<br />
              {category.fullLabel}
           </div>

           <div className="flex-grow">
              <div className="mb-4">
                 {/* SPE Qualification */}
                 {renderHTML(project.qualificationText)}
              </div>

              <div className="mb-6 text-justify leading-normal tracking-wide">
                 <b>CERTIFICA que</b> {formatClientQualification(data.clientQualification)}, 
                 nos termos do art. 47, § 1º, inc. II da Lei nº 16.050/2014, e demais regulamentações decorrentes.
              </div>

              <div className="mb-8 font-bold text-center">
                 ESTÁ ENQUADRADO<br />
                 Na faixa de renda<br />
                 <span className="bg-yellow-300 print:bg-transparent print:border-2 print:border-yellow-400 px-1">({category.label})</span>
              </div>

              <div className="mb-4">
                Os documentos apresentados comprovam uma renda familiar atual e declarada {incomeText} 
                conforme disposições contidas no Decreto Municipal nº 64.006/2025 e suas atualizações.
              </div>

              <div>
                Declaramos que as informações prestadas estão em conformidade com os documentos recebidos do solicitante.
              </div>
           </div>

           <div className="mt-12">
              <div className="text-center mb-12">
                 {project.city}, {data.day} de {data.month} de {data.year}
              </div>

              <div className="text-center w-full flex flex-col items-center">
                 <div className="w-[80%] border-t border-black mb-2"></div>
                 <div className="font-bold">{project.speName}</div>
                 <div>CNPJ: {project.cnpj}</div>
              </div>
           </div>
        </div>
      )}

      {/* 
        ===========================================================
        DOCUMENT 3: INVESTIDOR
        ===========================================================
      */}
      {data.docType === 'investidor' && category && (
         <div className="flex flex-col">
             <div className="text-center font-bold uppercase mb-10">
                DECLARAÇÃO DE CIÊNCIA DE DESENQUADRAMENTO<br/>
                {category.fullLabel}
             </div>

             <div className="mb-8 text-justify space-y-4 text-[11pt]">
                <p>
                    {pronouns.I}, <b>{data.clientName || '__________________'}</b>, portador do RG nº {data.clientRg || '_________'} e CPF nº {data.clientCpf || '_________'}
                    {isPlural && (
                        <>
                         e <b>{data.client2Name}</b>, portador do RG nº {data.client2Rg || '_________'} e CPF nº {data.client2Cpf || '_________'}
                        </>
                    )}
                    , {pronouns.owner} do imóvel localizado em <b>{project.address}</b>, 
                    {pronouns.declare} para os devidos fins ter ciência de ter adquirido uma unidade habitacional destinada a pessoas físicas com renda familiar atual e declarada inferior a 
                    <b> R$ {incomeText || '[X] (X REAIS)'}</b>, conforme disposições contidas no Decreto Municipal nº 64.006/2025 e suas atualizações. 
                    Declaro, ainda, que {pronouns.my} renda familiar atual não se enquadra nesse limite, ciente do meu desenquadramento em relação à faixa de renda exigida para a destinação dessa unidade, de modo que a unidade em questão NÃO TEM A FINALIDADE DE MINHA MORADIA PRÓPRIA.
                </p>

                <p>
                    {pronouns.declare.toUpperCase()}, ainda para os devidos fins, que para cumprimento do mencionado no item acima, destinará a unidade autônoma ora adquirida, exclusivamente, à revenda ou locação para pessoa física que comprove enquadrar-se nas regras estabelecidas na legislação, através da demonstração da sua renda familiar mediante apresentação da documentação comprobatória, considerando as regras de enquadramento de renda familiar mensal previstas para a destinação, conforme artigos 46 e 47 do Plano Diretor Estratégico.
                </p>

                <p>
                    Caso a destinação da unidade acima identificada seja feita via locação para pessoas enquadradas na faixa de renda mensal familiar prevista na legislação, DECLARA ter ciência das seguintes obrigações, sujeitas à fiscalização do Poder Público e às penalidades previstas em Lei em caso de descumprimento:
                </p>

                <ul className="list-disc pl-6 space-y-1">
                    <li>
                        requerer, perante o respectivo Cartório de Registro de Imóveis, a averbação na matrícula da referida unidade indicando o uso para locação, conforme previsto no inciso I, §9°, do artigo 47, da Lei Municipal n° 16.050/2014 e no artigo 7°, inciso I, do Decreto 63.130/2024. {pronouns.have} ciência, ainda, que, caso pretenda alienar futuramente a unidade para pessoa enquadrada na faixa de renda legal, é de minha responsabilidade proceder com o pedido de baixa da averbação da locação perante o Cartório de Registro de Imóveis;
                    </li>
                    <li>
                        locar para família ou pessoa física enquadrada na faixa de renda mensal familiar acima prevista, devendo o aluguel representar até 30% (trinta por cento) da faixa de renda prevista para a respectiva tipologia, sendo vedada a locação por curta, curtíssima temporada ou por comodato;
                    </li>
                    <li>
                        comprovar o enquadramento do locatário, por meio de Certidão, que poderá ser elaborada por terceiro ou pelo locador da unidade, mediante o recebimento dos documentos que comprovem a renda do locatário, devendo ser observadas as disposições da Lei Federal nº 13.709/2018 – Lei Geral de Proteção de Dados (LGPD), no que diz respeito ao tratamento de dados pessoais do locatário;
                    </li>
                    <li>
                        ser o responsável pela veracidade das informações que constarão da Certidão e pela guarda dos documentos que comprovam o enquadramento da renda mensal familiar do locatário;
                    </li>
                    <li>
                        informar, de forma clara e legível, a tipologia da unidade nos anúncios e peças publicitárias referentes à locação da unidade, assim como no contrato de locação;
                    </li>
                    <li>
                        cadastrar em plataforma eletrônica específica a ser disponibilizada pela Prefeitura o contrato de locação e os documentos de renda que comprovam a destinação da unidade.
                    </li>
                </ul>

                <p>
                    Caso a alienação da unidade acima identificada seja feita para terceiros não enquadrados na faixa de renda, DECLARA ter ciência do dever de observar, no instrumento de venda, o valor máximo de alienação da unidade, conforme estabelecido pelo artigo 6-A, do Decreto 63.130/2024, com a redação dada pelo Decreto 64.244/2025; o compromisso da destinação a terceiros enquadrados na renda familiar mensal, além do cumprimento de todas as exigências legais acima mencionadas.
                </p>
                
                <p>
                    DECLARA, também, que observará as formalidades para alienação da unidade previstas no Decreto 63.130/2024 e se obriga a informar aos sucessores a respeito da destinação da unidade autônoma, para pessoa física que se enquadre na faixa de renda mensal familiar prevista no referido Decreto e demais legislações aplicáveis em vigor.
                </p>
                
                <p>
                    Por fim, {pronouns.ratify}(amos) o consentimento a todos os termos e condições estipulados no CONTRATO PARTICULAR DE PROMESSA DE COMPRA E VENDA DE IMÓVEL EM CONSTRUÇÃO, incluindo o Quadro Resumo e as Cláusulas e Condições Gerais.
                </p>
                
                <p>
                    Por ser expressão da verdade, {pronouns.firm} o presente.<br/>
                    Nada mais.
                </p>
             </div>

             {/* Signature Block - Keep together */}
             <div className="mt-8" style={{ pageBreakInside: 'avoid' }}>
                <div className="text-left mb-8">
                {project.city}, {data.day} de {data.month} de {data.year}.
                </div>

                <div className="flex flex-col space-y-6">
                    <div>
                        <div className="w-[60%] border-t border-black mb-1"></div>
                        <div className="font-bold uppercase">{data.clientName || 'PROPRIETÁRIO 1'}</div>
                    </div>
                    {isPlural && (
                        <div>
                            <div className="w-[60%] border-t border-black mb-1"></div>
                            <div className="font-bold uppercase">{data.client2Name || 'PROPRIETÁRIO 2'}</div>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-[9pt] border-t pt-2 text-gray-600 italic">
                    Nota: Este documento foi assinado para fins da aquisição da {project.id === 'villagio' ? 'casa' : 'unidade'} <b>{project.id === 'villagio' ? data.houseNumber : data.unitNumber}</b>
                    {project.id !== 'villagio' && data.towerName ? ` - Torre ${data.towerName}` : ''} do empreendimento <b>{project.name}</b>, 
                    comercializada conforme <b>{project.address}</b> da matrícula <b>{data.matriculaOverride || project.matricula}</b> do <b>{project.cartorio}</b>.
                </div>
             </div>
         </div>
      )}

      {/* 
        ===========================================================
        DOCUMENT 4: PRIMEIRA/SEGUNDA AQUISIÇÃO
        ===========================================================
      */}
      {data.docType === 'primeira_aquisicao' && (
         <div className="flex flex-col h-full justify-between">
            <div>
                <div className="text-center font-bold uppercase mb-8">
                    Ilmo. Sr. Oficial do Cartório do {project.cartorio}
                </div>

                <div className="text-center font-bold uppercase mb-8">
                    DECLARAÇÃO DE PRIMEIRA/SEGUNDA AQUISIÇÃO
                </div>

                <div className="text-justify mb-6 leading-relaxed">
                    Eu, <b>{data.clientName || '_______________'}</b>, portador(a) da Carteira de Registro de Identidade Nº: <b>{data.clientRg || '_________'}</b> e do CPF N°: <b>{data.clientCpf || '_________'}</b>, declaro para os devidos fins, que:
                </div>

                <div className="space-y-6 text-justify">
                    <div className="flex gap-3">
                        <div className="font-mono font-bold whitespace-nowrap">
                            ( {data.acquisitionType === 'first' ? 'X' : ' '} )
                        </div>
                        <div>
                        (1) esta é a minha primeira aquisição imobiliária; (2) que o imóvel é para fins residenciais; e (3) que o adquiro através de financiamento pelo Sistema Financeiro de Habitação, me enquadrando no disposto no art. 290 da Lei 6.015/73 que dispõe: 
                        <div className="italic mt-2 px-4">
                        “Os emolumentos devidos pelos atos relacionados com a primeira aquisição imobiliária para fins residenciais, financiada pelo Sistema Financeiro da Habitação, serão reduzidos em 50% (cinquenta por cento)’’. 
                        </div>
                        <div className="mt-2">
                        Declaro ainda que tenho ciência que o não enquadramento nas condições acima resulta na perda dos benefícios supra mencionados e na obrigatoriedade da complementação dos emolumentos, bem como que inserir declaração falsa em documento público, com fim de prejudicar direito, criar obrigação ou alterar fato juridicamente relevante caracteriza crime de falsidade ideológica previsto no art. 299 do Código Penal com pena de 1 (um) a 5 (cinco) anos de reclusão, e multa, sem prejuízo das demais responsabilidades civis.
                        </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <div className="font-mono font-bold whitespace-nowrap">
                             ( {data.acquisitionType === 'second' ? 'X' : ' '} )
                        </div>
                        <div>
                            Declaro ter ciência de que não tenho direito à redução de emolumentos por não me enquadrar nos critérios legais para a concessão de tal benefício.
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-auto">
                 <div className="text-center mb-12">
                    {project.city}, {data.day} de {data.month} de {data.year}.
                </div>

                <div className="text-center w-full flex flex-col items-center">
                   <div className="w-[80%] border-t border-black mb-2"></div>
                   <div className="font-bold">{data.clientName || 'CLIENTE'}</div>
                   <div>CPF n° {data.clientCpf || '___________'}</div>
                </div>
            </div>
         </div>
      )}

    </div>
  );
};

export default DocumentPreview;
