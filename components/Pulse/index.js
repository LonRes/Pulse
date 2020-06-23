import React from 'react'
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import dynamic from 'next/dynamic';
import Properties from '@app/Properties';
import * as e from './styles';

const Map = dynamic(() => import('@app/Map'), {
    ssr: false,
    loading: () => <e.Loading>Loading Map&hellip;</e.Loading>,
});

export default function Pulse({ models }) {
    const [cache, setCache] = React.useState(models)
    React.useEffect(() => {
        const socket = io()
        socket.open().on('property', ({ message: { model } }) => {
            setCache([
                model,
                ...cache,
            ])
        })

        return () => {
            socket.off('property')
            socket.close()
        }
    }, [])

    return (
        <e.Container>
            <Map models={cache} />
            <Properties models={cache} />
        </e.Container>
    );
}

Pulse.propTypes = { models: PropTypes.array.isRequired };
