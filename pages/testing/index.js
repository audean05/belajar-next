import React, { useState, useEffect, useRef } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';

const UploaderKutim = () => {
    const breadcrumbHome = { icon: 'pi pi-home', to: '/' };
    const breadcrumbItems = [{ label: 'Bank Perekonomian Rakyat' }, { label: 'Kutai Timur'}, { label: 'Uploader' }];
   
    return (

        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Bank Perekonomian Rakyat - Kutai Timur</h5>
                    <BreadCrumb home={breadcrumbHome} model={breadcrumbItems} />
                </div>
            </div>

               
     
        </div>
    );
};

export default UploaderKutim;
