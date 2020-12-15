import styled, {css} from 'styled-components'
import { animated } from 'react-spring'

interface ContainerProps {
    type?: 'success' | 'info' | 'warning' | 'error'
}

const toastTypeVariations = {
    info: css`
        background: #212529;
    `,
    success: css`
        background: #10D269;
    `,
    error: css`
        background: #ff0000;
    `,
    warning: css`
        background: #FFCC49;
    `
}

export const Container = styled(animated.div)<ContainerProps>`
    width: 100vw;
    position: absolute;
    display: flex;
    color: #fff;
    height: 80px;
    align-items: center;
    justify-content: center;

    ${props => toastTypeVariations[props.type || 'info']}

    div {
        display: flex;
        align-items: center;
        max-width: 1216px;
        width: 100%;

        img {
            margin: 0 12px 0 0;
            width: 40px;
            height: 40px;
        }


        p {
            font-family: 'Maven Pro';
            font-weight: 500;
            font-size: 18px;
            line-height: 150%;
            color: #fff;
        }
    }

    @media(max-width: 540px) {
        height: 60px;
        padding: 0 24px;


        div {
            
            img {
                width: 32px;
                height: 32px;
                margin: 0 8 0 0;
            }

            p {
                font-size: 14px;
            }
        }
    }

`
