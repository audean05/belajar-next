import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Chip } from 'primereact/chip';
import { InputTextarea } from 'primereact/inputtextarea';
import { AutoComplete } from 'primereact/autocomplete';
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';
import { Slider } from 'primereact/slider';
import { Knob } from 'primereact/knob';
import { Rating } from 'primereact/rating';
import { ColorPicker } from 'primereact/colorpicker';
import { RadioButton } from 'primereact/radiobutton';
import { Checkbox } from 'primereact/checkbox';
import { InputSwitch } from 'primereact/inputswitch';
import { ListBox } from 'primereact/listbox';
import { Dropdown } from 'primereact/dropdown';
import { ToggleButton } from 'primereact/togglebutton';
import { MultiSelect } from 'primereact/multiselect';
import { TreeSelect } from 'primereact/treeselect';
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { CountryService } from '../../../demo/service/CountryService';
import { NodeService } from '../../../demo/service/NodeService';

export const CalculatorKutim = () => {
    const [floatValue, setFloatValue] = useState('');
    const [autoValue, setAutoValue] = useState(null);
    const [selectedAutoValue, setSelectedAutoValue] = useState(null);
    const [autoFilteredValue, setAutoFilteredValue] = useState([]);
    const [calendarValue, setCalendarValue] = useState(null);
    const [inputNumberValue, setInputNumberValue] = useState(null);
    const [chipsValue, setChipsValue] = useState([]);
    const [sliderValue, setSliderValue] = useState('');
    const [ratingValue, setRatingValue] = useState(null);
    const [colorValue, setColorValue] = useState('1976D2');
    const [knobValue, setKnobValue] = useState(20);
    const [radioValue, setRadioValue] = useState(null);
    const [checkboxValue, setCheckboxValue] = useState([]);
    const [switchValue, setSwitchValue] = useState(false);
    const [listboxValue, setListboxValue] = useState(null);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [multiselectValue, setMultiselectValue] = useState(null);
    const [toggleValue, setToggleValue] = useState(false);
    const [selectButtonValue1, setSelectButtonValue1] = useState(null);
    const [selectButtonValue2, setSelectButtonValue2] = useState(null);
    const [inputGroupValue, setInputGroupValue] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [treeSelectNodes, setTreeSelectNodes] = useState(null);

    const listboxValues = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const dropdownValues = [
        { name: 'Kredit Pegawai Plus Pegawai Pemerintah', code: 'NY' },
        { name: 'Kredit Pegawai Plus Pegawai Swasta', code: 'RM' },
        { name: 'Kredit Pegawai Plus Perangkat Desa', code: 'LDN' },
        { name: 'Kepala Desa dan PPPK', code: 'IST' }
    ];

    const multiselectValues = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];

    const selectButtonValues1 = [
        { name: 'Option 1', code: 'O1' },
        { name: 'Option 2', code: 'O2' },
        { name: 'Option 3', code: 'O3' }
    ];

    const selectButtonValues2 = [
        { name: 'Option 1', code: 'O1' },
        { name: 'Option 2', code: 'O2' },
        { name: 'Option 3', code: 'O3' }
    ];

    useEffect(() => {
        const countryService = new CountryService();
        const nodeService = new NodeService();
        countryService.getCountries().then((data) => setAutoValue(data));
        nodeService.getTreeNodes().then((data) => setTreeSelectNodes(data));
    }, []);

    const searchCountry = (event) => {
        setTimeout(() => {
            if (!event.query.trim().length) {
                setAutoFilteredValue([...autoValue]);
            } else {
                setAutoFilteredValue(
                    autoValue.filter((country) => {
                        return country.name.toLowerCase().startsWith(event.query.toLowerCase());
                    })
                );
            }
        }, 250);
    };

    const onCheckboxChange = (e) => {
        let selectedValue = [...checkboxValue];
        if (e.checked) selectedValue.push(e.value);
        else selectedValue.splice(selectedValue.indexOf(e.value), 1);

        setCheckboxValue(selectedValue);
    };

    const itemTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <span className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px', height: '12px' }} />
                <span>{option.name}</span>
            </div>
        );
    };

    return (        
        <div className="grid p-fluid">
            <div className="col-12 md:col-6">

            <div className="card">
                    <h5>Calculator Premi</h5>
       
                    <h5>Product Insurance</h5>
                    <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Select" />

                    <h5></h5>
                    <div className="grid formgrid">
                        <div className="col-12 mb-2 lg:col-6">
                            <h5>Current Age</h5>
                            <InputText value={sliderValue} onChange={(e) => setSliderValue(parseInt(e.target.value), 10)} />
                            <Slider value={sliderValue} onChange={(e) => setSliderValue(e.value)} />
                        </div>

                        <div className="col-12 mb-2 lg:col-6">
                            <h5>Loan Term</h5>
                            <InputText value={sliderValue} onChange={(e) => setSliderValue(parseInt(e.target.value), 10)} />
                            <Slider value={sliderValue} onChange={(e) => setSliderValue(e.value)} />
                        </div>    
                    </div>               

                    <h5>Loan Amount</h5>
                    <InputText type="text" placeholder="Default"></InputText>

                    <h5></h5>
                    <Button label="Calculator" icon="pi pi-calculator" iconPos="right" />

                   
                </div>
                                
            </div>

            <div className="col-12 md:col-6">
                <div className="card">

                    <div className="font-medium text-3xl text-900 mb-3">Premi Information</div>
                    <div className="text-500 mb-5">Premium Calculation Based on (Loan Amount * Loan Term) / rate</div>
                    <ul className="list-none p-0 m-0">
                        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div className="text-500 w-6 md:w-4 font-medium">Product Insurance</div>
                            <div className="text-900 w-full md:w-6 md:flex-order-0 flex-order-1">Kredit Pegawai Plus Pegawai Pemerintah</div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div className="text-500 w-6 md:w-4 font-medium">Current Age</div>
                            <div className="text-900 w-full md:w-6 md:flex-order-0 flex-order-1">50 Tahun</div>
                        </li>
                        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div className="text-500 w-6 md:w-4 font-medium">End Age</div>
                            <div className="text-900 w-full md:w-6 md:flex-order-0 flex-order-1">55 Tahun</div>
                            {/* <div className="w-6 md:w-2 flex justify-content-end">
                                <Button label="Edit" icon="pi pi-pencil" className="p-button-text" />
                            </div> */}
                        </li>
                        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div className="text-500 w-6 md:w-4 font-medium">Loan Term</div>
                            <div className="text-900 w-full md:w-6 md:flex-order-0 flex-order-1">60 Bulan</div>
                            {/* <div className="w-6 md:w-2 flex justify-content-end">
                                <Button label="Edit" icon="pi pi-pencil" className="p-button-text" />
                            </div> */}
                        </li>
                        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div className="text-500 w-6 md:w-4 font-medium">Loan Amount</div>
                            <div className="text-900 w-full md:w-6 md:flex-order-0 flex-order-1">Rp. 150.000,00</div>
                            {/* <div className="w-6 md:w-2 flex justify-content-end">
                                <Button label="Edit" icon="pi pi-pencil" className="p-button-text" />
                            </div> */}
                        </li>
                        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div className="text-500 w-6 md:w-4 font-medium">Rate</div>
                            <div className="text-900 w-full md:w-6 md:flex-order-0 flex-order-1">0,65 %</div>
                            {/* <div className="w-6 md:w-2 flex justify-content-end">
                                <Button label="Edit" icon="pi pi-pencil" className="p-button-text" />
                            </div> */}
                        </li>
                        <li className="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
                            <div className="text-500 w-6 md:w-4 font-medium">Premi</div>
                            <div className="text-900 w-full md:w-6 md:flex-order-0 flex-order-1">Rp. 975,00</div>
                            {/* <div className="w-6 md:w-2 flex justify-content-end">
                                <Button label="Edit" icon="pi pi-pencil" className="p-button-text" />
                            </div> */}
                        </li>              
                                                         
                    </ul>
                </div>       
             
            </div>

          
        </div>
    );
};

export default CalculatorKutim;
