
import React, { useState } from 'react';
import './Header.css'

function Header() {
    const [data, setData] = useState([]);
    const [type, setType] = useState("");

    const searchShows = (search) => {
        fetch(`https://api.tvmaze.com/search/shows?q=${search}`)
            .then(response => response.json())
            .then(shows => {
                setData(shows);
            })
    }
    const searchActor = (search) => {
        fetch(`https://api.tvmaze.com/search/people?q=${search}`)
            .then(response => response.json())
            .then(actor => {
                console.log(actor);
                setData(actor);
            })
    }
    const changeType = (value) => {
        setData('');
        if (value === 'Actor') {
            setType('Actor')
        } else {
            setType('Shows')
        }
    }
    return (
        <div className="header">
            <div className='ABC'>
                <h1>TVmaze</h1>
                <h3>Search your favourite shows</h3>
                <input type="radio" name="radio" value="Actor" onClick={() => changeType('Actor')} /> Actor 
                <input type="radio" name="radio" value="Shows" onClick={() => changeType('Shows')} /> Shows
                <div >
                    <>
                        {type === 'Actor'
                            ? <input type="text" className="form-control" placeholder="eg:akon" onChange={e => searchActor(e.target.value)} />
                            : <input type="text" className="form-control" placeholder="eg:friends" onChange={e => searchShows(e.target.value)} />
                        }
                    </>
                </div>
            </div>
            <div className="row">
            {data? data.map((data, i) => (
                        <div key={i} >
                            {data.show &&
                                <div className="movie-box">
                                    {data.show.image?<img src={data.show.image.medium} alt="Show"/>:<img src="../images/blank.jpg" alt="Show"/>}
                                    <h4>{data.show.name}</h4>
                                    
                                </div>
                            }
                            {data.person &&
                                <div className="movie-box">
                                    {data.person.image?<img src={data.person.image.medium} alt="Person"/>:<img src="../images/blank.jpg" alt="Person"/>}
                                    <h4>{data.person.name}</h4>
                                    
                                </div>
                            }
                        </div>
                    )):null}
            </div>
        </div>


    )
}
export default Header;