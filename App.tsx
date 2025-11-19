
import React, { useState, useEffect } from 'react';
import { FileText, Printer, FileCheck, DollarSign, Settings, Plus, Minus, Loader2, Award } from 'lucide-react';
import { PROJECTS, CATEGORIES } from './constants';
import { FormData, DocType } from './types';
import DocumentPreview from './components/DocumentPreview';

// --- Masking Helpers ---

const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, '') // Remove non-digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1'); // Limit length
};

const maskRG = (value: string) => {
  // Remove special chars but allow X/x for the check digit
  let v = value.replace(/[^0-9Xx]/g, '');
  
  // Standard SP format: 00.000.000-0
  v = v.replace(/(\d{2})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})([0-9Xx]{1})$/, '$1-$2');
  
  return v.substring(0, 13); // Limit length (12 chars roughly)
};

const maskMatricula = (value: string) => {
  const v = value.replace(/\D/g, '');
  // Add dots every 3 digits from right to left is standard, but for typing left-to-right simple grouping:
  return v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

const App: React.FC = () => {
  const today = new Date();
  const months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

  const [formData, setFormData] = useState<FormData>({
    docType: 'desenquadramento',
    projectId: PROJECTS[0].id,
    category: 'HIS-2',
    acquisitionType: 'first',
    
    clientName: '',
    clientRg: '',
    clientCpf: '',
    clientQualification: '', // For Doc 2
    
    client2Name: '',
    client2Rg: '',
    client2Cpf: '',

    unitNumber: '',
    towerName: '',
    houseNumber: '',
    
    propertyAddress: '', // Unused now for input, but kept in state for type compatibility if needed

    matriculaOverride: '', 

    day: String(today.getDate()),
    month: months[today.getMonth()],
    year: '2025',
    fileName: 'DECLARAÇÃO DE DESENQUADRAMENTO PMCMV - ',
    customIncomeText: ''
  });

  const [showClient2, setShowClient2] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const currentProject = PROJECTS.find(p => p.id === formData.projectId);
  const currentCategory = CATEGORIES.find(c => c.id === formData.category);
  const isVillagio = formData.projectId === 'villagio';

  // Auto update filename based on Doc Type, Category, and Client Info
  useEffect(() => {
    let prefix = '';
    let suffix = '';

    switch (formData.docType) {
      case 'desenquadramento':
        prefix = 'DECLARAÇÃO DE DESENQUADRAMENTO PMCMV - ';
        // For Doc 1, we use Unit/House since there is no client name field
        if (formData.projectId === 'villagio') {
            suffix = formData.houseNumber ? `CASA ${formData.houseNumber}` : '';
        } else {
            suffix = formData.unitNumber ? `APT ${formData.unitNumber}` : '';
        }
        break;
        
      case 'enquadramento':
        // Includes Category ID (e.g. HIS-2)
        prefix = `DECLARAÇÃO DE ENQUADRAMENTO ${formData.category} - `;
        // Extract name from qualification (text before the first comma)
        if (formData.clientQualification) {
            const namePart = formData.clientQualification.split(',')[0];
            suffix = namePart.trim();
        }
        break;
        
      case 'investidor':
        prefix = 'DECLARAÇÃO DE INVESTIDOR - ';
        if (formData.clientName) {
            suffix = formData.clientName.trim();
        }
        break;

      case 'primeira_aquisicao':
        prefix = 'DECLARAÇÃO PRIMEIRA AQUISIÇÃO - ';
        if (formData.clientName) {
            suffix = formData.clientName.trim();
        }
        break;
    }

    setFormData(prev => ({
        ...prev,
        fileName: `${prefix}${suffix.toUpperCase()}`
    }));
  }, [
    formData.docType, 
    formData.category, 
    formData.acquisitionType,
    formData.clientName, 
    formData.clientQualification, 
    formData.unitNumber, 
    formData.houseNumber, 
    formData.projectId
  ]);

  // Update custom income text when category changes
  useEffect(() => {
    if (currentCategory) {
      setFormData(prev => ({ ...prev, customIncomeText: currentCategory.incomeRangeText }));
    }
  }, [formData.category]);

  // Dynamically update document title for the "Save as PDF" filename
  useEffect(() => {
    document.title = formData.fileName || 'Emccamp Documento';
    return () => {
        document.title = 'Emccamp Doc Generator';
    }
  }, [formData.fileName]);

  const handleDownload = async () => {
    const element = document.getElementById('document-export');
    if (!element) return;

    setIsGenerating(true);

    // @ts-ignore
    if (window.html2pdf) {
        const opt = {
            margin: 0,
            filename: `${formData.fileName || 'documento'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
        };
        
        try {
            // @ts-ignore
            await window.html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
            alert("Houve um erro ao gerar o PDF. Tentando impressão nativa...");
            window.print();
        } finally {
            setIsGenerating(false);
        }
    } else {
        // Fallback if library fails to load
        window.print();
        setIsGenerating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    // Apply masks
    if (name === 'clientCpf' || name === 'client2Cpf') {
      newValue = maskCPF(value);
    } else if (name === 'clientRg' || name === 'client2Rg') {
      newValue = maskRG(value);
    } else if (name === 'matriculaOverride') {
      newValue = maskMatricula(value);
    }

    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row text-sm font-sans">
      
      {/* Sidebar / Form Controls - Hidden on Print */}
      <div className="w-full md:w-[420px] bg-white shadow-lg h-screen overflow-y-auto sticky top-0 no-print flex flex-col z-10 border-r">
        {/* Header with Brand Green */}
        <div className="p-6 bg-[#8dc63f] text-white flex flex-col items-center text-center justify-center">
          <h1 className="text-xl font-bold tracking-wide">EMCCAMP - DECLARAÇÕES</h1>
          <p className="text-white/90 text-xs mt-2 font-medium">Aproveite e acelere a emissão da sua declaração!</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b bg-gray-50">
          <button 
            onClick={() => setFormData(prev => ({...prev, docType: 'desenquadramento'}))}
            className={`flex-1 py-4 text-xs font-medium uppercase tracking-wider flex flex-col items-center gap-1 ${formData.docType === 'desenquadramento' ? 'bg-white text-[#8dc63f] border-b-2 border-[#8dc63f] shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <FileCheck size={18} />
            Desenquadra.
          </button>
          <button 
             onClick={() => setFormData(prev => ({...prev, docType: 'enquadramento'}))}
             className={`flex-1 py-4 text-xs font-medium uppercase tracking-wider flex flex-col items-center gap-1 ${formData.docType === 'enquadramento' ? 'bg-white text-[#8dc63f] border-b-2 border-[#8dc63f] shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Settings size={18} />
            Enquadra.
          </button>
          <button 
             onClick={() => setFormData(prev => ({...prev, docType: 'investidor'}))}
             className={`flex-1 py-4 text-xs font-medium uppercase tracking-wider flex flex-col items-center gap-1 ${formData.docType === 'investidor' ? 'bg-white text-[#8dc63f] border-b-2 border-[#8dc63f] shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <DollarSign size={18} />
            Investidor
          </button>
          <button 
             onClick={() => setFormData(prev => ({...prev, docType: 'primeira_aquisicao'}))}
             className={`flex-1 py-4 text-xs font-medium uppercase tracking-wider flex flex-col items-center gap-1 ${formData.docType === 'primeira_aquisicao' ? 'bg-white text-[#8dc63f] border-b-2 border-[#8dc63f] shadow-sm' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <Award size={18} />
            1ª Aquisição
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1">
          {/* Common Fields */}
          <div className="space-y-4">
            
            {/* Project Selection */}
            <label className="block">
              <span className="text-gray-700 font-bold text-sm">Empreendimento</span>
              <select 
                name="projectId" 
                value={formData.projectId} 
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8dc63f] focus:ring-[#8dc63f] p-2 border"
              >
                {PROJECTS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </label>

            {/* Acquisition Type Selector - Only for Doc 4 */}
            {formData.docType === 'primeira_aquisicao' && (
                <label className="block bg-blue-50 p-3 rounded border border-blue-200">
                  <span className="text-blue-800 font-bold text-xs uppercase">Tipo de Aquisição</span>
                  <select 
                    name="acquisitionType" 
                    value={formData.acquisitionType} 
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border text-sm"
                  >
                    <option value="first">Primeira Aquisição</option>
                    <option value="second">Segunda Aquisição</option>
                  </select>
                </label>
            )}

            {/* Categoria Section - Only for Doc 2 & 3 */}
            {(formData.docType === 'enquadramento' || formData.docType === 'investidor') && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg space-y-3">
                <label className="block">
                  <span className="text-yellow-800 font-bold text-xs uppercase">Categoria de Uso</span>
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 p-2 border text-sm"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.label} - {c.fullLabel}</option>
                    ))}
                  </select>
                </label>
                
                <label className="block">
                  <span className="text-gray-700 font-semibold text-xs">Renda (editável)</span>
                  <input 
                    type="text" 
                    name="customIncomeText" 
                    value={formData.customIncomeText} 
                    onChange={handleInputChange}
                    placeholder={formData.docType === 'investidor' ? "Ex: 4.700,01 (QUATRO MIL...)" : ""}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8dc63f] focus:ring-[#8dc63f] p-2 border text-xs"
                  />
                  {formData.docType === 'investidor' && <p className="text-[10px] text-gray-500 mt-1">Para doc investidor, use formato: X (X REAIS)</p>}
                </label>
              </div>
            )}

            {/* Unit Info - Conditional Rendering */}
            {/* Hide Unit/Tower info for Enquadramento, Villagio, or Primeira Aquisicao */}
            {formData.docType !== 'enquadramento' && formData.docType !== 'primeira_aquisicao' && !isVillagio && (
                <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                        <span className="text-gray-700 font-semibold text-xs">Unidade/Apto</span>
                        <input 
                            type="text" 
                            name="unitNumber" 
                            value={formData.unitNumber} 
                            onChange={handleInputChange}
                            placeholder="Ex: 101"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8dc63f] focus:ring-[#8dc63f] p-2 border"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700 font-semibold text-xs">Torre (Opcional)</span>
                        <input 
                            type="text" 
                            name="towerName" 
                            value={formData.towerName} 
                            onChange={handleInputChange}
                            placeholder="Ex: A"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8dc63f] focus:ring-[#8dc63f] p-2 border"
                        />
                    </label>
                </div>
            )}

            {/* Hide House Number for Enquadramento and Primeira Aquisicao. Show only for Villagio when needed */}
            {formData.docType !== 'enquadramento' && formData.docType !== 'primeira_aquisicao' && isVillagio && (
               <label className="block bg-green-50 p-2 rounded border border-green-200">
                  <span className="text-green-800 font-bold text-xs">Número da Casa (Villagio)</span>
                  <input 
                    type="text" 
                    name="houseNumber" 
                    value={formData.houseNumber} 
                    onChange={handleInputChange}
                    placeholder="Ex: 15"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8dc63f] focus:ring-[#8dc63f] p-2 border"
                  />
               </label>
            )}

            {/* Matricula Fields */}
            {formData.docType !== 'enquadramento' && formData.docType !== 'primeira_aquisicao' && (
                <div className="grid grid-cols-1 gap-4">
                    {/* Hide Individual Matricula for Enquadramento */}
                    <label className="block">
                        <span className="text-gray-700 font-semibold text-xs">Matrícula Individualizada</span>
                        <input 
                        type="text" 
                        name="matriculaOverride" 
                        value={formData.matriculaOverride} 
                        onChange={handleInputChange}
                        placeholder="Ex: 123.456"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8dc63f] focus:ring-[#8dc63f] p-2 border"
                        />
                    </label>
                </div>
            )}
            {formData.docType !== 'enquadramento' && formData.docType !== 'primeira_aquisicao' && (
              <p className="text-[10px] text-gray-500 -mt-2">A matrícula do projeto (mãe) não será alterada. Preencha este campo apenas para unidade individualizada.</p>
            )}


            {/* Client Info - Different for Enquadramento vs Investidor */}
            
            {/* Doc 2: Just a big text area for qualification */}
            {formData.docType === 'enquadramento' && (
               <label className="block">
                  <span className="text-gray-700 font-semibold text-xs">Qualificação do Cliente</span>
                  <textarea 
                    name="clientQualification" 
                    value={formData.clientQualification} 
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Ex: FULANO DE TAL, brasileiro, solteiro, portador do RG..."
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8dc63f] focus:ring-[#8dc63f] p-2 border text-xs"
                  />
                  <p className="text-[10px] text-gray-500 mt-1">O sistema adiciona "CERTIFICA que" e bold nos nomes.</p>
               </label>
            )}

            {/* Doc 3 & 4: Detailed Fields */}
            {(formData.docType === 'investidor' || formData.docType === 'primeira_aquisicao') && (
                <div className="bg-[#f0f7e6] p-3 rounded-lg border border-[#e2eec8] space-y-3">
                    <h3 className="font-bold text-[#6a9e2a] text-xs uppercase">Dados do Proprietário</h3>
                    
                    {/* Client 1 */}
                    <div className="space-y-2">
                        <input 
                            type="text" 
                            name="clientName" 
                            value={formData.clientName} 
                            onChange={handleInputChange}
                            placeholder="Nome Completo"
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8dc63f] focus:ring-[#8dc63f] p-2 border text-xs"
                        />
                         <div className="grid grid-cols-2 gap-2">
                            <input 
                                type="text" 
                                name="clientRg" 
                                value={formData.clientRg} 
                                onChange={handleInputChange}
                                placeholder="RG (00.000.000-0)"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8dc63f] focus:ring-[#8dc63f] p-2 border text-xs"
                            />
                            <input 
                                type="text" 
                                name="clientCpf" 
                                value={formData.clientCpf} 
                                onChange={handleInputChange}
                                placeholder="CPF (000.000.000-00)"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8dc63f] focus:ring-[#8dc63f] p-2 border text-xs"
                            />
                         </div>
                    </div>

                    {/* Client 2 Toggle (Investidor only for now unless specified otherwise) */}
                    {formData.docType === 'investidor' && (
                        <>
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-xs text-[#6a9e2a] font-semibold">Segundo Comprador?</span>
                                <button 
                                    onClick={() => setShowClient2(!showClient2)}
                                    className="text-[#8dc63f] hover:text-[#6a9e2a]"
                                >
                                    {showClient2 ? <Minus size={16} /> : <Plus size={16} />}
                                </button>
                            </div>

                            {showClient2 && (
                                <div className="space-y-2 pt-2 border-t border-[#d4e5b0] animate-in fade-in slide-in-from-top-1">
                                    <input 
                                        type="text" 
                                        name="client2Name" 
                                        value={formData.client2Name} 
                                        onChange={handleInputChange}
                                        placeholder="Nome Completo (2)"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8dc63f] focus:ring-[#8dc63f] p-2 border text-xs"
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                        <input 
                                            type="text" 
                                            name="client2Rg" 
                                            value={formData.client2Rg} 
                                            onChange={handleInputChange}
                                            placeholder="RG (2)"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8dc63f] focus:ring-[#8dc63f] p-2 border text-xs"
                                        />
                                        <input 
                                            type="text" 
                                            name="client2Cpf" 
                                            value={formData.client2Cpf} 
                                            onChange={handleInputChange}
                                            placeholder="CPF (2)"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8dc63f] focus:ring-[#8dc63f] p-2 border text-xs"
                                        />
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* Date */}
            <label className="block">
                <span className="text-gray-700 font-semibold text-xs mb-1 block">Data da Emissão</span>
                <div className="grid grid-cols-3 gap-2 bg-gray-50 p-3 rounded border">
                <input type="text" name="day" value={formData.day} onChange={handleInputChange} className="w-full p-1 border rounded text-center text-sm" />
                <input type="text" name="month" value={formData.month} onChange={handleInputChange} className="w-full p-1 border rounded text-center text-sm" />
                <input type="text" name="year" value={formData.year} onChange={handleInputChange} className="w-full p-1 border rounded text-center text-sm" />
                </div>
            </label>

             {/* Filename */}
             <label className="block pt-4 border-t">
                  <span className="text-gray-700 font-semibold text-sm">Nome do Arquivo</span>
                  <div className="flex items-center">
                    <input 
                      type="text" 
                      name="fileName" 
                      value={formData.fileName} 
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-l-md border-gray-300 shadow-sm focus:border-[#8dc63f] focus:ring-[#8dc63f] p-2 border"
                    />
                    <span className="mt-1 bg-gray-100 border border-l-0 border-gray-300 p-2 text-gray-500 rounded-r-md text-sm">.pdf</span>
                  </div>
             </label>

          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t">
          <button 
            onClick={handleDownload}
            disabled={isGenerating}
            className={`w-full text-white font-bold py-3 px-4 rounded flex items-center justify-center gap-2 transition-colors shadow-md ${isGenerating ? 'bg-[#a4d665] cursor-not-allowed' : 'bg-[#8dc63f] hover:bg-[#7ab030]'}`}
          >
            {isGenerating ? (
                <>
                    <Loader2 className="animate-spin" /> Gerando PDF...
                </>
            ) : (
                <>
                    <Printer /> Salvar PDF
                </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content / Preview Area */}
      <div className="flex-1 bg-gray-200 p-8 overflow-y-auto print:p-0 print:bg-white min-h-screen">
         <div id="document-export" className="max-w-[210mm] mx-auto print:w-full print:max-w-none shadow-2xl print:shadow-none">
           <DocumentPreview 
              data={{...formData, showClient2}} 
              project={currentProject} 
              category={currentCategory} 
           />
         </div>
      </div>

    </div>
  );
};

export default App;
