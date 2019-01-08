import './Select.scss'

import {
    default as ReactSelect,
    Creatable as ReactSelectCreatable,
} from 'react-select'

import React from 'react'
import { ClassValue, BEM } from '../../../../services/BEMService'
import { Icon, IconType } from '../../Icon/Icon'

interface Props {
    className?: ClassValue
    name: string
    multi?: boolean
    addable?: boolean
    placeholder?: string
    options?: SelectOption[]
    defaultValue?: SelectOption[]
    onEndReached?: () => void
    onChange?: (selectedOptions: SelectOption | SelectOption[] | null, name: string) => void
    onSearch?: (query: string) => void
    loadingMore?: boolean
    loading?: boolean
    clearable?: boolean
    searchable?: boolean
    disabled?: boolean
}

export interface SelectOption {
    value: string|number
    label: string
}

export class Select extends React.PureComponent<Props> {

    public state = {
        selectedOption: this.props.defaultValue ? this.props.multi ? this.props.defaultValue : this.props.defaultValue[0] : undefined,
    }

    private bem = new BEM('Select', () => ({
        'is-multi': this.props.multi,
    }))

    public render() {
        const {
            className,
            options,
            name,
            multi,
            addable,
            clearable,
            placeholder,
            searchable,
            loading,
            disabled,
            onEndReached,
        } = this.props

        const { selectedOption } = this.state

        const sharedProps = {
            className: this.bem.getClassName(className),
            optionClassName: this.bem.getElement('option'),
            name: name,
            value: selectedOption,
            onChange: this.handleOnChange,
            options: options,
            multi: multi,
            clearable: clearable,
            onInputChange: this.onInputChangeHandler,
            noResultsText: 'No results',
            placeholder: placeholder || 'Select something',
            searchable: searchable,
            isLoading: loading,
            disabled: disabled,
            arrowRenderer: this.renderArrow,
            clearRenderer: this.renderClear,
            onMenuScrollToBottom: onEndReached,
        }

        if (addable) {
            return (
                <ReactSelectCreatable
                    {...sharedProps}
                />
            )
        }

        return (
            <ReactSelect {...sharedProps}/>
        )
    }

    private renderArrow = () => {
        const { multi } = this.props

        if (multi) {
            return null
        }

        return <Icon className={this.bem.getElement('arrow-icon')} type={IconType.DownArrow} />
    }

    private renderClear = () => {
        return <Icon className={this.bem.getElement('clear-icon')} type={IconType.Close} />
    }

    private onInputChangeHandler = (query: any) => {
        const { onSearch } = this.props

        if (onSearch) {
            onSearch(query)
        }

        return query
    }

    private handleOnChange = (selectedOption: SelectOption) => {
        const { onChange, name } = this.props
        this.setState({ selectedOption })

        const option = selectedOption as SelectOption

        if (onChange) {
            onChange(option, name)
        }
    }
}
