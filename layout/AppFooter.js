import getConfig from 'next/config';
import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;

    return (
        <div className="layout-footer">
            <img src={`${contextPath}/layout/images/logoasei-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.png`} alt="Logo" height="20" className="mr-2" />
           
            <span className="font-medium ml-2">PT. Asuransi Asei Indonesia</span>
        </div>
    );
};

export default AppFooter;
