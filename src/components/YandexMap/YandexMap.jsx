import React from 'react';
import './YandexMap.css'
import {YMaps, Map, Placemark, FullscreenControl, ZoomControl} from '@pbe/react-yandex-maps';
import {Link} from "react-router-dom";


export default function YandexMap({ isStateDoorSoldering }) {
    const mapState = {
        center: [55.013872, 82.954099],
        zoom: 10,
        controls: []
    };
    return (
        <>
            <Link className="link link_map" to='/'>
                <p className="link__title">Статистика</p>
            </Link>
            <YMaps>
                <Map width="100%" height="100vh" state={mapState} >
                    <Placemark
                        geometry={[55.013872, 82.954099]}
                        options={{
                           iconColor: `${isStateDoorSoldering ? '#32CD32' : '#F80000'}`
                        }}
                    />
                    <FullscreenControl options={{ float: "left" }} />
                    <ZoomControl options={{ float: "right" }} />
                </Map>
            </YMaps>
        </>
    );
}