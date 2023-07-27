import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';


const SeacrhBws = () => {
    const [loading2, setLoading2] = useState(false);
    const [calendarValueAwal, setCalendarValueAwal] = useState(null);
    const [calendarValueAkhir, setCalendarValueAkhir] = useState(null);

    const [dataApi, setDataApi] = useState([]);
    const [loadingApi, setLoadingApi] = useState(true);
    const [searchClicked, setSearchClicked] = useState(false);

     useEffect(() => {
        fetchDataApi();
      }, []);

      const fetchDataApi = async () => {
        if (!calendarValueAwal || !calendarValueAkhir) {
          return; // Return early if either of the dates is not selected yet
        }
    
        setLoadingApi(true);
        setSearchClicked(true); // Set searchClicked to true when the button is clicked
    
        try {
          const formattedStartDate = formatDate(calendarValueAwal);
          const formattedEndDate = formatDate(calendarValueAkhir);
    
          const response = await fetch(
            `http://paplus.asei.co.id:5002/GET_DATABWS?tgl_start=${formattedStartDate}&tgl_end=${formattedEndDate}`
          );
    
          const data = await response.json();
          const processedDataApi = processDataApi(data);
          setDataApi(processedDataApi);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoadingApi(false);
          setSearchClicked(false); // Set searchClicked back to false when the data is fetched
        }
      };

      const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };

      const processDataApi = (data) => {
        return data.map((item, index) => ({ 
          rowIndex: index + 1,
          custnam: item.CLNAMA,
          loanno: item.LOANNO,
          refnumber: item.REFNUMBER,
          produk: item.PRODUK,
          namaak: item.NAMAAK,
          cabasei: item.NMASEI,
          nmbank: item.NMBNK,
          cabbank: item.NMUNIT,
          periode: `${item.TGLM}-${item.BLNM}-${item.THNM} Sampai ${item.TGLA}-${item.BLNA}-${item.THNA}`,
          tglakhir: `${item.TGLA}-${item.BLNA}-${item.THNA}`, 
          balance: parseFloat(item.PREMI),
      }));
      };

    const statusPolicy = ['Active', 'Expired', 'Not Active', 'Pending', 'Process', 'Renewal'];  


    return (
        <div className="grid">            
            <div className="col-12">
                <div className="card">
                 
                    <div className="card">
                    <h5>Data Acceptance - Bank Woori Saudara</h5>
                    <div className="grid formgrid">
                        <div className="col-12 mb-2 lg:col-2 lg:mb-0">
                        <Calendar showIcon showButtonBar value={calendarValueAwal} onChange={(e) => setCalendarValueAwal(e.value)}></Calendar>
                        </div>
                        <div className="col-12 mb-2 lg:col-2 lg:mb-0">
                        <Calendar showIcon showButtonBar value={calendarValueAkhir} onChange={(e) => setCalendarValueAkhir(e.value)}></Calendar>
                        </div>
                        <div className="col-12 mb-2 lg:col-2 lg:mb-0">
                        <Button label="Search" icon="pi pi-search" iconPos="right" loading={searchClicked && loadingApi} onClick={fetchDataApi} />
                        </div>
                    </div>
                    </div>
          

                 {loadingApi ? (
                    <div>Loading Search Data...</div>
                    ) : dataApi.length > 0 ? (

                   <DataTable
                        value={dataApi}
                        paginator
                        className="p-datatable-gridlines"
                        showGridlines
                        rows={10}
                        dataKey="rowIndex"
                        loading={loadingApi}
                        responsiveLayout="scroll"
                        emptyMessage="No customers found."
                    >       

                        <Column field="rowIndex" header="No" sortable style={{ width: '3rem' }}/>
                        <Column field="custnam" header="Customer" filter filterPlaceholder="Search by custnam" style={{ minWidth: '12rem' }} /> 
                        <Column field="loanno" header="Loan Number" filter filterPlaceholder="Search by loanno" style={{ minWidth: '12rem' }} />
                        <Column field="refnumber" header="Ref Number" filter filterPlaceholder="Search by loan" style={{ minWidth: '12rem' }} /> 
                        <Column field="produk" header="Produk" filter filterPlaceholder="Search by loan" style={{ minWidth: '12rem' }} />
                        <Column field="namaak" header="COB" filter filterPlaceholder="Search by loan" style={{ minWidth: '12rem' }} />
                        <Column field="cabasei" header="Kantor Cabang ASEI" filter filterPlaceholder="Search by loan" style={{ minWidth: '12rem' }} />
                        <Column field="nmbank" header="Bank" filter filterPlaceholder="Search by loan" style={{ minWidth: '12rem' }} />
                        <Column field="periode" header="Periode Pertanggungan" filter filterPlaceholder="Search by loan" style={{ minWidth: '15rem' }} />
                        <Column field="balance" header="Premi" filter filterPlaceholder="Search by balance" style={{ minWidth: '12rem' }} />
                        {/* <Column field="status" header="Status" filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusFilterTemplate} /> */}
                    </DataTable>
                    ) : (
                    <div>No data available.</div>
                    )}
                </div>
            </div>       
     
        </div>
    );
};

export default SeacrhBws;
