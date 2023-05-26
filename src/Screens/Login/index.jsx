import { useState, useEffect } from "react"
import { Text, View } from "react-native"
import { setData, getData } from '../../Contexts/Data'
import { TextCuston } from "../../Components/TextInput"
import { ButtonCuston } from "../../Components/Button"
import { Style } from "../../Contexts/Theme"

export const Login = ({ navigation }) => {
    const [form, setForm] = useState({})
    const [error, setError] = useState('')
    var user = {}
    useEffect(() => {
        const FindUser = (value) => {
            user = value
        }
        getData(FindUser, 'user')
    })

    const CallBack = (key, value) => {
        var clone = Object.assign({}, form)
        clone[key] = value
        setForm(clone)
    }
    const Validated = () => {
        return (form.nome === user.nome && form.senha === user.senha)
            ? true : false
    }//Validar via banco de dados
    const Next = () => {
        if (Validated()) {
            user.login = true
            setData('user', user)
            navigation.navigate('Home')
        } else {
            setError('Login e senha não estão corretos.')
        }
    }
    const onPress = () => {
        (Validated())
            ? Next()
            : setError('Login e senha não estão corretos.')
    }
    return (<View style={Style.container}>
        <Text style={Style.title}>Loja</Text>
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
        <Text style={Style.error}>{error}</Text>
        <ButtonCuston onPress={onPress} placeholder='Entrar' />
    </View>)
}