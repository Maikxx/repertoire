import './PageHeader.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../services/BEMService'
import { Row } from '../../Core/Layout/Row/Row'
import { Wrap } from '../../Core/Layout/Wrap/Wrap'
import { Button, ButtonStyleType } from '../../Core/Button/Button'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Icon, IconType } from '../../Core/Icon/Icon'
import { logOut } from '../../../services/UserService'
import { History, Location } from 'history'
import { Heading } from '../../Core/Text/Heading/Heading'
import { routes } from '../../../views/routes'
import { Link } from 'react-router-dom'
import { Loader } from '../../Core/Feedback/Loader/Loader'
import { Text } from '../../Core/Text/Text/Text'

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
    className?: ClassValue
    history: History
    location: Location
}

export class PageHeader extends React.Component<Props> {
    private bem = new BEM('PageHeader')

    public render() {
        const { className } = this.props

        return (
            <header className={this.bem.getClassName(className)}>
                <Wrap>
                    <Row>
                        {this.renderIcon()}
                        <Heading level={1} className={this.bem.getElement('heading')}>
                            {this.renderPageHeading()}
                        </Heading>
                        <Query<CurrentUserResponse> query={GET_CURRENT_USER_QUERY}>
                            {({ data, loading }) => {
                                if (loading) {
                                    return <Loader />
                                }

                                if (!data) {
                                    return this.renderNoDataText()
                                }

                                return this.renderWithData(data)
                            }}
                        </Query>
                    </Row>
                </Wrap>
            </header>
        )
    }

    private renderNoDataText = () => (
        <Text element={`span`} isSubtle={true}>
            No user could be found
        </Text>
    )

    private renderWithData = (data: CurrentUserResponse) => {
        const { history } = this.props
        const nameOrEmail = data && data.me && (data.me.name || data.me.email)

        return (
            <Button
                buttonStyle={ButtonStyleType.Default}
                className={this.bem.getElement('logout-button')}
                onClick={() => logOut(history)}
                type={`button`}
            >
                <Row>
                    {nameOrEmail}
                    <Icon type={IconType.LogOut}/>
                </Row>
            </Button>
        )
    }

    private renderIcon = () => {
        const { location } = this.props

        if (location.pathname !== routes.app.dashboard.index) {
            return (
                <Link to={routes.app.dashboard.index}>
                    <Icon
                        className={this.bem.getElement('menu-icon')}
                        type={IconType.LeftArrow}
                    />
                </Link>
            )
        }

        return (
            <Icon
                className={this.bem.getElement('menu-icon')}
                type={IconType.Menu}
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
