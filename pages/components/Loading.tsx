import React from 'react';
import Image from 'next/image'

const Loading = () => {
    return (
        <div>
            <Image src="/loading.gif" alt="me" width="40" height="40" />
        </div>
    );
};

export default Loading;