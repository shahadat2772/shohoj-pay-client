import React from 'react';
import { Parallax,Background } from 'react-parallax';
const Banner1 = () => {
    return (
        <div>
<Parallax strength={300}>
        <Background className="custom-bg">
            <img src="http://www.fillmurray.com/500/320" alt="fill murray" />
        </Background>
    </Parallax>
        </div>
    );
};

export default Banner1;