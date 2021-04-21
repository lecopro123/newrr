import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Cross } from '../../icons';
import { opCoins } from '../../../../redux/actions/articleActions';
import './modal.scss';
import { Button } from '../../ui';
import Coin from '../../../assets/coin.svg'

const Modal = ({ handleClose, show, children, to, unlock, art_s, user_s, art_id, user_id, learning }) => {

    const history = useHistory();
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const [Load, sLoad] = useState(false)
    const firstUpdate = useRef(true);
    //console.log(user_id)
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        function initCallback() {
            console.log('OP_COIN_S')
            localStorage.setItem('article_unlock', JSON.stringify({ art_id, u: true }))
            setIsLoading(false)
            history.push({
                pathname:
                    '/article/read/' + art_id
            })
        }

        dispatch(opCoins(initCallback, user_id, art_id))
    }, [dispatch, setIsLoading, Load])
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="con">
                    <div
                        onClick={handleClose}
                        className="close-btn btn-circle"
                    >
                        <Cross />
                    </div>
                    <img width="100" height="100" src={unlock} alt="unlock" />
                    <div className="text">UNLOCK THIS ARTICLE
                        WITH ONLY {art_s} STARS.
                    </div>
                    <div style={{ alignSelf: 'center' }} dangerouslySetInnerHTML={{ __html: learning }} />
                    <div style={{ paddingTop: '20px' }}></div>
                    <Button style={{ width: '60%', alignSelf: 'center' }} className="btn-primary" type="button" onClick={() => sLoad(!Load)}>
                        SPEND &nbsp;{art_s}<img src={Coin} alt="Coins" />
                    </Button>
                </div>
            </section>
        </div>
    )
}
export default Modal;