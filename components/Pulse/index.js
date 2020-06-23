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

    // properties list
    React.useEffect(() => {
        const socket = io()
        socket.open().on('property', ({ message: { model } }) => {
            const found = cache.findIndex(
                cached => model.address1 === cached.address1
            )

            if(found > -1) {
                setCache([
                    ...cache.slice(0, found),
                    model,
                    ...cache.slice(found + 1),
                ])
            }
            else {
                setCache([
                    model,
                    ...cache,
                ])
            }
        })

        return () => {
            socket.off('property')
            socket.close()
        }
    }, [cache])


    // map centering
    const [center, setCenter] = React.useState([51.505, -0.09]);

    function onPropertyClicked ({ coordinates: { lat, lng } }) {
        setCenter([lat, lng]);
    }

    return (
        <e.Container>
            <Map
                center={center}
                models={cache}
            />
            <Properties
                onPropertyClicked={onPropertyClicked}
                models={cache}
            />
        </e.Container>
    );
}

Pulse.propTypes = { models: PropTypes.array.isRequired };
