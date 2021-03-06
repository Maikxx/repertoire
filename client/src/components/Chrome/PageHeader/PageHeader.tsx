import './PageHeader.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../services/BEMService'
import { Row } from '../../Core/Layout/Row/Row'
import LogoWhiteHorizontal from '../../../../public/images/logo/rpt-logo-white-horizontal.svg'
import { Image } from '../../Core/Image/Image'
import { Wrap } from '../../Core/Layout/Wrap/Wrap'
import { Link } from 'react-router-dom'
import { routes } from '../../../views/routes'
import { Button, ButtonStyleType } from '../../Core/Button/Button'
import { History, Location } from 'history'
import { Icon } from '../../Core/Icon/Icon'
import QuestionMarkIcon from '../../../../public/images/icons/question-mark.svg'
import SettingsIcon from '../../../../public/images/icons/settings.svg'

interface Props {
    className?: ClassValue
    history: History
    location: Location
}

export class PageHeader extends React.Component<Props> {
    private bem = new BEM('PageHeader')

    public render() {
        const { className, history, location } = this.props
        const showSettings = !location.pathname.includes(routes.app.currentUser)

        return (
            <header className={this.bem.getClassName(className)}>
                <Wrap>
                    <Row>
                        <Link to={routes.app.index}>
                            <Image
                                alt={`Repertoire logo`}
                                className={this.bem.getElement('logo')}
                                src={LogoWhiteHorizontal}
                            />
                        </Link>
                        <Row className={this.bem.getElement('navigation')}>
                            <Button
                                buttonStyle={ButtonStyleType.Default}
                                className={this.bem.getElement('navigation-button')}
                                onClick={() => history.push(routes.app.help)}
                                type={`button`}
                            >
                                <Icon src={QuestionMarkIcon}/>
                            </Button>
                            {showSettings && (
                                <Button
                                    buttonStyle={ButtonStyleType.Default}
                                    className={this.bem.getElement('navigation-button')}
                                    onClick={() => history.push(routes.app.currentUser)}
                                    type={`button`}
                                >
                                    <Icon src={SettingsIcon}/>
                                </Button>
                            )}
                        </Row>
                    </Row>
                </Wrap>
            </header>
        )
    }
}
