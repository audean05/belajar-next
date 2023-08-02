import React, { useEffect, useState } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { InputText } from 'primereact/inputtext';
import { Slider } from 'primereact/slider';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

import axios from 'axios';
import 'rc-slider/assets/index.css';

export const CalculatorKutim = () => {
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' }; 
    const breadcrumbItems = [{ label: 'Bank Perekonomian Rakyat' }, { label: 'Kutai Timur'}, { label: 'Calculator Premi' }];

    const [sliderValueAge, setSliderValueAge] = useState('');
    const [sliderValueTenor, setSliderValueTenor] = useState('');
    const [dropdownValue, setDropdownValue] = useState(null);
    const [loanAmount, setLoanAmount] = useState('');

    const [productInsurance, setProductInsurance] = useState('');
    const [currentAge, setCurrentAge] = useState(''); 
    const [loanTerm, setLoanTerm] = useState('');
    const [rate, setRate] = useState(null);

    const [premiInformation, setPremiInformation] = useState({
        productInsurance: '',
        currentAge: '',
        loanTerm: '',
        loanAmount: '',
        premiumAmount: '',
        endAge: '', 
      });

    const dropdownValues = [
        { name: 'Kredit Pegawai Plus Pegawai Pemerintah', code: '1000000001' },
        { name: 'Kredit Pegawai Plus Pegawai Swasta', code: '1000000002' },
        { name: 'Kredit Pegawai Plus Perangkat Desa', code: '1000000005' },
        { name: 'Kepala Desa dan PPPK', code: '1000000011' },
        { name: 'Kredit Konsumtif Umum', code: '3100500001' }
    ];

    const handleLoanAmountChange = (e) => {
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^0-9.]/g, '');
        let formattedValue = sanitizedValue;
        
        const decimalIndex = formattedValue.indexOf('.');
        if (decimalIndex !== -1) {
          formattedValue = formattedValue.slice(0, decimalIndex + 3);
        }
      
        const integerPart = formattedValue.split('.')[0];
        if (integerPart.length > 1 && integerPart[0] === '0') {
          formattedValue = integerPart.slice(1) + '.' + formattedValue.split('.')[1];
        }
        
        setLoanAmount(formattedValue);
      };

    const handleSliderChangeAge = (e) => {
        const newValue = parseInt(e.value, 10);
        if (newValue <= 55) {
          setSliderValueAge(newValue);
          setCurrentAge(`${newValue} Years`);
        }
      };

      const handleSliderChangeTenor = (e) => {
        const newValue = parseInt(e.value, 10);
        if (newValue <= 120) {
          setSliderValueTenor(newValue);
          setLoanTerm(`${newValue} Months`);
        }
      };

      const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
      };

      const formatRate = (rate) => {
        const parsedRate = parseFloat(rate);
        if (isNaN(parsedRate)) {
          return 'N/A';
        } else {
          return `${parsedRate.toFixed(2)}%`;
        }
      };

      const fetchRate = async (productInsurance, loanTerm) => {
        try {
          const response = await axios.get(`http://tesapiasei.asei.co.id:5033/GET_RATE_KUTIM`, {
            params: {
              prodkod: productInsurance,
              tenor: loanTerm,
            },
          });
          const rateValue = response.data[0]?.RATE;
          setRate(rateValue);
    
          const premiumPercentage = rateValue ? parseFloat(rateValue) / 100 : 0;
          const loanAmountValue = loanAmount ? parseFloat(loanAmount) : 0;
          const premium = (loanAmountValue * premiumPercentage).toFixed(2);

          const currentAgeValue = parseInt(sliderValueAge, 10);
          const loanTermValue = parseInt(sliderValueTenor, 10);
          const endAgeValue = currentAgeValue + Math.round(loanTermValue / 12);     
    
          setPremiInformation({
            productInsurance: dropdownValue?.name || '',
            currentAge: `${sliderValueAge} Years`,
            loanTerm: `${sliderValueTenor} Months`,
            loanAmount: loanAmount,
            premiumAmount: premium,
            endAge: `${endAgeValue} Years`,
          });
        } catch (error) {
          console.error('Error fetching rate:', error);
        }
      };

      const handleCalculate = () => {
        const premiumPercentage = 0.05;
        const premium = (parseFloat(loanAmount) * parseFloat(sliderValueTenor) * premiumPercentage).toFixed(2);

        const currentAgeValue = parseInt(sliderValueAge, 10);
        const loanTermValue = parseInt(sliderValueTenor, 10);
        const endAgeValue = currentAgeValue + Math.round(loanTermValue / 12);  
    
        setPremiInformation({
          productInsurance: dropdownValue?.name || '',
          currentAge: `${sliderValueAge} Years`,
          loanTerm: `${sliderValueTenor} Months`,
          loanAmount: loanAmount,
          premiumAmount: premium,
          endAge: `${endAgeValue} Years`,
        });

        fetchRate(dropdownValue?.code, sliderValueTenor);
      };   

    return (         
        <div className="grid p-fluid">

            <div className="col-12">
                <div className="card">                
                    <h5><i className="pi pi-fw pi-calculator"></i> Calculator Premi</h5>
                    <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
                </div>
            </div>

            <div className="col-12 md:col-6">

            <div className="card">
                {/* <div className="font-medium text-3xl text-900 mb-3">Premi Information</div> */}
       
                    <h5>Product Insurance</h5>
                    <Dropdown value={dropdownValue} 
                                onChange={(e) => {
                                    setDropdownValue(e.value);
                                    setProductInsurance(e.value.name); 
                                }} 
                        options={dropdownValues} 
                        optionLabel="name" placeholder="Select Product Insurance" 
                    />

                    <h5></h5>
                    <div className="grid formgrid">
                    <div className="col-12 mb-2 lg:col-6">
                        <h5>Current Age</h5>
                        <div style={{ marginBottom: '10px' }}>
                        {sliderValueAge} Years
                        </div>
                        <Slider value={sliderValueAge} onChange={handleSliderChangeAge} min={0} max={55} />
                    </div>

                    <div className="col-12 mb-2 lg:col-6">
                        <h5>Loan Term</h5>
                        <div style={{ marginBottom: '10px' }}>
                        {sliderValueTenor} Months
                        </div>
                        <Slider value={sliderValueTenor} onChange={handleSliderChangeTenor} min={0} max={120} />
                    </div>
                    </div>               

                    <h5>Loan Amount</h5>
                    <InputText type="number" step="0.01" value={loanAmount} onChange={handleLoanAmountChange} />

                    <h5></h5>
                    <Button label="Calculator" icon="pi pi-calculator" iconPos="right" onClick={handleCalculate} />
                   
                </div>
                                
            </div>

            <div className="col-12 md:col-6">
                <div className="card">

                    <div className="font-medium text-3xl text-900 mb-3">Premi Information</div>
                    <div className="text-500 mb-5">Premium Calculation Based on (Loan Amount * Loan Term) / rate</div>
                    <ul className="list-none p-0 m-0">
                        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div className="text-500 w-6 md:w-4 font-medium">Product Insurance</div>
                            <div className="text-900 w-full md:w-6 md:flex-order-0 flex-order-1">{premiInformation.productInsurance}</div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div className="text-500 w-6 md:w-4 font-medium">Current Age</div>
                            <div className="text-900 w-full md:w-6 md:flex-order-0 flex-order-1">{premiInformation.currentAge}</div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div className="text-500 w-6 md:w-4 font-medium">Loan Term</div>
                            <div className="text-900 w-full md:w-6 md:flex-order-0 flex-order-1">{premiInformation.loanTerm}</div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div className="text-500 w-6 md:w-4 font-medium">End Age</div>
                            <div className="text-900 w-full md:w-6 md:flex-order-0 flex-order-1">{premiInformation.endAge}</div>
                        </li>                        
                        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div className="text-500 w-6 md:w-4 font-medium">Loan Amount</div>
                            <div className="text-900 w-full md:w-6 md:flex-order-0 flex-order-1">{formatCurrency(premiInformation.loanAmount)}</div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div className="text-500 w-6 md:w-4 font-medium">Rate</div>
                            <div className="text-900 w-full md:w-6 md:flex-order-0 flex-order-1">{formatRate(rate)}</div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div className="text-500 w-6 md:w-4 font-medium">Premi</div>
                            <div className="text-900 w-full md:w-6 md:flex-order-0 flex-order-1">
                                <div class="list-group-item-value">
                                    <b>{formatCurrency(premiInformation.premiumAmount)}</b>
                                </div>
                            </div>
                        </li>              
                                                         
                    </ul>
                </div>       
             
            </div>

          
        </div>
    );
};

export default CalculatorKutim;
