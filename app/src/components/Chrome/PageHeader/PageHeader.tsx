import './PageHeader.scss'
import * as React from 'react'
import { BEM } from '../../../services/BEMService'
import { Row } from '../../Core/Layout/Row/Row'
import { Wrap } from '../../Core/Layout/Wrap/Wrap'
import { Button, ButtonStyleType } from '../../Core/Button/Button'
import { Query } from 'react-apollo'
import MenuIcon from '../../../../public/images/icons/menu-button.svg'
import BackArrowIcon from '../../../../public/images/icons/left-arrow.svg'
import gql from 'graphql-tag'
import { Icon } from '../../Core/Icon/Icon'
import LogoutIcon from '../../../../public/images/icons/logout.svg'
import { logOut } from '../../../services/UserService'
import { History, Location } from 'history'
import { Heading } from '../../Core/Text/Heading/Heading'
import { routes } from '../../../views/routes'
import { Link } from 'react-router-dom'

const GET_CURRENT_USER_QUERY = gql`
    query {
        me {
            _id
            email
            name
        }
    }
`

interface CurrentUserResponse {
    me: {
        _id: string
        email: string
        name?: string
    }
}

interface Props {
    className?: string
    history: History
    location: Location
}

export class PageHeader extends React.Component<Props> {
    private bem = new BEM('PageHeader')

    public render() {
        const { className, history } = this.props

        return (
            <header className={this.bem.getClassName(className)}>
                <Wrap>
                    <Row>
                        {this.renderIcon()}
                        <Heading level={1} className={this.bem.getElement('heading')}>
                            {this.renderPageHeading()}
                        </Heading>
                        <Query<CurrentUserResponse> query={GET_CURRENT_USER_QUERY}>
                            {({ data }) => {
                                const userInformationToShow = data && data.me && (data.me.name || data.me.email)

                                return (
                                    <Button
                                        buttonStyle={ButtonStyleType.Default}
                                        className={this.bem.getElement('logout-button')}
                                        onClick={() => {
                                            logOut(history)
                                        }}
                                        type={`button`}
                                    >
                                        <Row>
                                            {userInformationToShow}
                                            <Icon
                                                isExtraSmall={true}
                                                src={LogoutIcon}
                                            />
                                        </Row>
                                    </Button>
                                )
                            }}
                        </Query>
                    </Row>
                </Wrap>
            </header>
        )
    }

    private renderIcon = () => {
        const { location } = this.props

        if (location.pathname !== routes.app.dashboard.index) {
            return (
                <Link to={routes.app.dashboard.index}>
                    <Icon
                        className={this.bem.getElement('menu-icon')}
                        src={BackArrowIcon}
                    />
                </Link>
            )
        }

        return (
            <Icon
                className={this.bem.getElement('menu-icon')}
                src={MenuIcon}
            />
        )
    }

    private renderPageHeading = () => {
        const { location } = this.props

        switch (location.pathname) {
            case routes.app.dashboard.index:
                return 'Repertoire'
            case routes.app.dashboard.register:
                return 'Register song'
            case routes.app.dashboard.addCreator:
                return 'Add music creator'
            case routes.app.dashboard.addPublisher:
                return 'Add publisher/PRO'
            default:
                return null
        }
    }
}
