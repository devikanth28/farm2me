import { Toolbar } from 'primereact/toolbar';

const CourierChargesToolbar = ({ leftToolbarTemplate } : any) => {
    return (
        <>
            <Toolbar className='measurement-toolbar'
                left={leftToolbarTemplate}></Toolbar>
        </>
    );
};

export default CourierChargesToolbar;