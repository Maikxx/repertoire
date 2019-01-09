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
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Icon } from '../../Core/Icon/Icon'
import LogoutIcon from '../../../../public/images/icons/logout.svg'
import { logOut } from '../../../services/UserService'
import { History } from 'history'

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
}

export class PageHeader extends React.Component<Props> {
    private bem = new BEM('PageHeader')

    public render() {
        const { className } = this.props

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
                        <Query<CurrentUserResponse> query={GET_CURRENT_USER_QUERY}>
                            {({ data }) => this.renderWithData(data)}
                        </Query>
                    </Row>
                </Wrap>
            </header>
        )
    }

    private renderWithData = (data?: CurrentUserResponse) => {
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
                    <Icon
                        isExtraSmall={true}
                        src={LogoutIcon}
                    />
                </Row>
            </Button>
        )
    }
}
