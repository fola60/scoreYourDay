import '../styles/SideBar.css'
import { PiNotepadBold } from "react-icons/pi";
import { TiHome } from "react-icons/ti";
import { FaWrench } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
import { TbTableShare } from "react-icons/tb";
import { useState,useEffect } from 'react';

export default function SideBar() {
    const [open,setOpen] = useState(window.innerWidth >= 800)
    const closeWindow = () => {
        setOpen(!open);

    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 800) {
                setOpen(false);
            } else {
                setOpen(true);
            }
        }

        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])

    

    return (
        <>
            <div className="container-sb" >
                <div className="header-sb">
                    <PiNotepadBold color='white' size={85}/>
                    {open && <div className="brand-name">ScoreYourDay</div>}
                </div>
                <div className="elements-sb">
                    <div className="home-sb el">
                        <TiHome color='white' size={35}/>
                        {open && <div className="home">Home</div>}
                    </div>
                    <div className="utilities-sb el">
                        <FaWrench size={30} />
                        {open && <div className="utilities">Utilities</div>}
                    </div>
                    <div className="charts-sb el">
                        <FaChartBar />
                        {open && <div className="charts">Charts</div>}
                    </div>
                    <div className="tables-sb el">
                        <TbTableShare />
                        {open && <div className="tables">Tables</div>}
                    </div>
                </div>
                <div className="close">
                    {open ? (
                        <div className='close' onClick={closeWindow}> {'<'} </div>
                        ): 
                        (
                            <div className='close' onClick={closeWindow}> {'>'} </div>
                        )}
                </div>
            </div>
        </>
    )
}