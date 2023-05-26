import { useState } from "react"
import { Text, View } from "react-native"
import { setData } from '../../Contexts/Data'
import { TextCuston } from "../../Components/TextInput"
import { ButtonCuston } from "../../Components/Button"
import { Style } from "../../Contexts/Theme"

export const Register = ({ navigation }) => {
    const [form, setForm] = useState({})
    const [error, setError] = useState('')

    const validateName = (nome) => {
        const parts = nome.split(' ');
        return parts.length > 1;
    }

    const validatePassword = (senha) => {
        return senha.length >= 6 && senha.length <= 8;
    }

    const validateEmail = (email) => {
        return email.includes('@') && email.includes('.');
    }

    const validatePhone = (telefone) => {
        return telefone.match(/^\(\d{2}\)\s\d{5}-\d{4}$/) !== null;
    }

    const CallBack = (key, value) => {
        var clone = Object.assign({}, form)
        clone[key] = value
        setForm(clone)

        let validationFunction;
        switch (key) {
            case 'nome':
                validationFunction = validateName;
                break;
            case 'senha':
                validationFunction = validatePassword;
                break;
            case 'email':
                validationFunction = validateEmail;
                break;
            case 'telefone':
                validationFunction = validatePhone;
                break;
            default:
                validationFunction = () => true;
        }

        if (!validationFunction(value)) {
            setError(`Por favor, preencha os campos corretamente.`);
        } else {
            setError('');
        }
    }

    const Validated = () => {
        return validateName(form.nome) && validatePassword(form.senha) && validateEmail(form.email) && validatePhone(form.telefone)
    }

    const Next = () => {
        var clone = Object.assign({}, form)
        clone.login = true
        setData('user', clone)
        navigation.navigate('Home')
    }

    const onPress = () => {
        (Validated())
            ? Next()
            : setError('Preencha o formulário corretamente.')
    }

    return (<View style={Style.container}>
        <Text style={Style.title}>Cadastre-se</Text>
        <TextCuston
            name='nome'
            value={form.nome}
            placeholder='Nome'
            CallBack={CallBack} />
        <TextCuston
            name='senha'
            value={form.senha}
            placeholder='Senha'
            CallBack={CallBack} 
            isPassword={true} />
        <TextCuston
            name='email'
            value={form.email}
            placeholder='E-mail'
            CallBack={CallBack} />
        <TextCuston
            name='telefone'
            value={form.telefone}
            placeholder='Telefone'
            CallBack={CallBack} />
        <Text style={Style.error}>{error}</Text>
        <ButtonCuston onPress={onPress} placeholder='Cadastrar' />
    </View>)
}
