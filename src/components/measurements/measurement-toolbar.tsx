import { Toolbar } from 'primereact/toolbar';

const MeasurementToolbar = ({ leftToolbarTemplate } : any) => {
    return (
        <>
            <Toolbar className='measurement-toolbar'
                left={leftToolbarTemplate}></Toolbar>
        </>
    );
};

export default MeasurementToolbar;