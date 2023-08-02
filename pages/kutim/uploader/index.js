import React, { useState, useRef } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { Toast } from 'primereact/toast';
import { FileUpload } from 'primereact/fileupload';
import { Tooltip } from 'primereact/tooltip';
import axios from 'axios';
import XLSX from 'xlsx';

const UploaderKutim = () => {
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [{ label: 'Bank Perekonomian Rakyat' }, { label: 'Kutai Timur'}, { label: 'Uploader' }];

    const toast = useRef(null);
    const fileUploadRef = useRef(null);

    const [totalSize, setTotalSize] = useState(0);

    const onTemplateClear = () => {
        setTotalSize(0);
    }

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        e.files.forEach(file => {
            _totalSize += file.size;
        });

        setTotalSize(_totalSize);
    }

    const onTemplateUpload = async (e) => {
        let _totalSize = 0;
        e.files.forEach(async (file) => {
            _totalSize += (file.size || 0);
            await processFile(file);
        });

        setTotalSize(_totalSize);
        toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-table mt-3 p-5" style={{'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)'}}></i>
                <span style={{'fontSize': '1.2em', color: 'var(--text-color-secondary)'}} className="my-5">Drag and Drop Excel Here</span>
            </div>
        )
    }

    const processFile = async (file) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            for (const row of jsonData) {
                const formData = new FormData();
                formData.append('typed', 1);
                formData.append('approve', row['Column1']);
                formData.append('loanno', row['Column2']);

                try {
                    const response = await fetch('http://tesapiasei.asei.co.id:5033/INS_TEMPNBWS', {
                      method: 'POST',
                      body: formData
                    });
                  
                    if (response.ok) {
                      const data = await response.json();
                      console.log(data);
                    } else {
                      console.error('Request failed:', response.status, response.statusText);
                    }
                  } catch (error) {
                    console.error('Fetch error:', error);
                  }
                  
            }
        };
        reader.readAsArrayBuffer(file);
    }

    const chooseOptions = {icon: 'pi pi-fw pi-folder-open', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined'};
    const uploadOptions = {icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined'};
    const cancelOptions = {icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined'};

    return (
        <div className="grid">
            <Toast ref={toast}></Toast>

            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />   

            <div className="col-12">
                <div className="card">
                    <h5><i className="pi pi-fw pi-upload"></i> Bank Perekonomian Rakyat - Kutai Timur</h5>
                    <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />                    
                </div>

                <div className="card">
                    <h5>Upload Data Acceptance</h5>
                    <FileUpload name="demo[]" url="#" accept="xlsx/*" 
                        maxFileSize={1000000}
                        onUpload={onTemplateUpload}
                        onClear={onTemplateClear}
                        chooseOptions={chooseOptions} 
                        uploadOptions={uploadOptions} 
                        cancelOptions={cancelOptions}  
                        emptyTemplate={emptyTemplate}
                    />
                </div>
            </div>
        </div>
    );
};

export default UploaderKutim;
