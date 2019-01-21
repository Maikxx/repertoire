import * as React from 'react'
import { FieldCollection } from '../../Core/Field/FieldCollection/FieldCollection'
import { FieldGroup } from '../../Core/Field/FieldGroup/FieldGroup'
import { Field } from '../../Core/Field/Field/Field'
import { GetCurrentUserQuery } from '../../GraphQL/CurrentUserQuery'
import { History } from 'history'
import { FieldCollectionFooter } from '../../Core/Field/FieldCollectionFooter/FieldCollectionFooter'
import { Button, ButtonStyleType } from '../../Core/Button/Button'
import { logOut } from '../../../services/UserService'

interface Props {
    history: History
}

export class UserFields extends React.Component<Props> {
    public render() {
        const { history } = this.props

        return (
            <GetCurrentUserQuery>
                {({ data }) => {
                    const currentUser = data && data.me

                    if (!currentUser) {
                        return null
                    }

                    return (
                        <FieldCollection>
                            <FieldGroup title={`General`}>
                                <Field title={`Name`}>
                                    {currentUser.name}
                                </Field>
                                <Field title={`Email address`}>
                                    {currentUser.email}
                                </Field>
                            </FieldGroup>
                            <FieldGroup title={`Function`}>
                                <Field title={`Role`}>
                                    {currentUser.isAdmin
                                        ? 'Admin'
                                        : 'Regular user'
                                    }
                                </Field>
                            </FieldGroup>
                            <FieldCollectionFooter>
                                <Button
                                    buttonStyle={ButtonStyleType.Secondary}
                                    onClick={() => logOut(history)}
                                    type={`button`}
                                >
                                    Logout
                                </Button>
                            </FieldCollectionFooter>
                        </FieldCollection>
                    )
                }}
            </GetCurrentUserQuery>
        )
    }
}
