import './Form.scss'
import * as React from 'react'
import { BEM, ClassValue } from '../../../../services/BEMService'
import getFormData from 'get-form-data'
import set from 'lodash-es/set'
import isArrayLike from 'lodash-es/isArrayLike'

export interface Fields {
    [key: string]: any
}

type FormAutoCapitalizeType = 'none' | 'sentences' | 'words' | 'characters'
type FormAutoCompleteType = 'off' | 'on'
type FormEncTypeType = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
type FormMethodType = 'post' | 'get' | 'dialog'
type FormTarget = '_self' | '_blank' | '_parent' | '_top' | string

interface Props {
    acceptCharset?: string
    action?: string
    autoCapitalize?: FormAutoCapitalizeType
    autocomplete?: FormAutoCompleteType
    className?: ClassValue
    encType?: FormEncTypeType
    id?: string
    method?: FormMethodType
    name?: string
    noValidate?: boolean
    onChange?: React.ChangeEventHandler<HTMLFormElement>
    onSubmit?: (fields: Fields) => void
    shouldPreventDefault?: boolean
    renderFormTitle?: () => React.ReactElement<HTMLHeadingElement>
    target?: FormTarget
}

export const getFieldsFromSubmitEvent = (event: React.FormEvent<HTMLFormElement>) => {
    return Array.prototype.slice.call(event.target)
        .filter((el: HTMLInputElement | HTMLTextAreaElement) => el.name)
        .reduce((form: any, el: HTMLInputElement | HTMLTextAreaElement) => ({
            ...form,
            [el.name]: el.value.trim(),
        }), {})
}

export class Form extends React.Component<Props> {
    public static defaultProps = {
        shouldPreventDefault: true,
    }

    private bem = new BEM('Form')
    private formRef = React.createRef<HTMLFormElement>()

    public render() {
        const {
            children,
            className,
            onSubmit,
            shouldPreventDefault,
            renderFormTitle,
            // tslint:disable-next-line:trailing-comma
            ...restProps
        } = this.props

        return (
            <form
                className={this.bem.getClassName(className)}
                onSubmit={this.onSubmit}
                ref={this.formRef}
                {...restProps}
            >
                {renderFormTitle && renderFormTitle()}
                {children}
            </form>
        )
    }

    private onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
        const { shouldPreventDefault, onSubmit } = this.props

        if (!this.formRef.current && onSubmit) {
            return onSubmit({})
        }

        const formData = getFormData(this.formRef.current)

        const values = {}

        for (const key in formData) {
            if (formData.hasOwnProperty(key)) {
                if (!this.formRef.current) {
                    return null
                }

                const value = formData[key]
                const element = this.formRef.current.elements[key]
                const parsedValue = this.parseValue(element, value)

                set(values, key, parsedValue)
            }
        }

        if (shouldPreventDefault) {
            event.preventDefault()
        }

        if (onSubmit) {
            onSubmit(values)
        }
    }

    private parseValue(elementOrElements: HTMLInputElement | HTMLInputElement[], value: any): any {
        const element: HTMLInputElement = isArrayLike(elementOrElements)
            ? elementOrElements[0]
            : elementOrElements

        // Parse checkbox input
        if (element.type === 'checkbox') {
            return element.checked
        }

        if (element.type === 'radio') {
            if (value === 'true') {
                return true
            }

            if (value === 'false') {
                return false
            }

            return value
        }

        // Parse number input
        if (element.type === 'number') {
            return value && value.trim() !== ''
                ? +value
                : null
        }

        return value
    }
}
