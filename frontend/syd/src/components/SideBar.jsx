import '../styles/SideBar.css'
import { PiNotepadBold } from "react-icons/pi";
import { TiHome } from "react-icons/ti";
import { FaWrench } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
import { TbTableShare } from "react-icons/tb";
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SideBar() {
    const query = useQuery();
    const id = query.get('id');
    const navigate = useNavigate();

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

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])

    const redirect = (url) => {
        navigate(url + '/?id=' + id);
    }

    

    return (
        <>
            <div className="container-sb" >
                <div className="header-sb">
                    <PiNotepadBold color='white' size={85}/>
                    {open && <div className="brand-name">ScoreYourDay</div>}
                </div>
                <div className="elements-sb">
                    <div className="home-sb el" onClick={() => redirect('/home')}>
                        <TiHome color='white' size={35}/>
                        {open && <div className="home">Home</div>}
                    </div>
                    <div className="utilities-sb el" onClick={() => redirect('/Utilities')}>
                        <FaWrench size={30} />
                        {open && <div className="utilities">Utilities</div>}
                    </div>
                    <div className="charts-sb el" onClick={() => redirect('/Analytics')}>
                        <FaChartBar />
                        {open && <div className="charts">Analytics</div>}
                    </div>
                    {/* <div className="tables-sb el" onClick={() => redirect('/Table')}>
                        <TbTableShare />
                        {open && <div className="tables">Tables</div>}
                    </div> */}
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