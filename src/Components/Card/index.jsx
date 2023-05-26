import { View, Text } from "react-native"
import { Style } from "../../Contexts/Theme"
import { useState, useEffect } from "react"
import { ImageCuston } from "../Image"
import { ButtonCuston } from '../Button'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Card = (props) => {
    const [getQtd, setQtd] = useState({})
    const [totalItemsInCart, setTotalItemsInCart] = useState(0)

    const loadCart = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('sacola')
            let sacola = jsonValue != null ? JSON.parse(jsonValue) : {}

            if (sacola && sacola[props.title]) {
                setQtd((prevState) => ({ ...prevState, [props.title]: sacola[props.title].quantity }))
            }

            let total = 0
            for (let item in sacola) {
                total += sacola[item].quantity
            }
            setTotalItemsInCart(total)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        loadCart()
    }, [])

    const addToCart = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('sacola')
            let sacola = jsonValue != null ? JSON.parse(jsonValue) : {}

            sacola[props.title] = {
                quantity: getQtd[props.title] || 0,
                title: props.title,
                descrition: props.descrition,
                price: props.price,
            }

            await AsyncStorage.setItem('sacola', JSON.stringify(sacola))
            loadCart()
        } catch (e) {
            console.error(e)
        }
    }

    const removeFromCart = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('sacola')
            let sacola = jsonValue != null ? JSON.parse(jsonValue) : {}

            if (sacola[props.title]) {
                delete sacola[props.title]
            }

            await AsyncStorage.setItem('sacola', JSON.stringify(sacola))
            loadCart()
        } catch (e) {
            console.error(e)
        }
    }

    const add = () => {
        setQtd((prevState) => ({ ...prevState, [props.title]: (prevState[props.title] || 0) + 1 }))
    }

    const remove = () => {
        setQtd((prevState) => ({ ...prevState, [props.title]: prevState[props.title] > 0 ? prevState[props.title] - 1 : 0 }))
    }

    const onPress = () => {
        props.navigation.navigate('Detalhes', { ...props })
    }

    return (
        <View style={[Style.row, Style.card, Style.cardBorder]}>
            <View style={[Style.column, Style.cardImg]}><ImageCuston img={props.img} />
                <Text onPress={onPress} style={Style.subText}>Veja mais detalhes</Text>
            </View>
            <View style={Style.column}>
                <Text style={Style.title}>{props.title}</Text>
                <View style={[Style.card]}>
                    <Text style={Style.text}><Text>R$ </Text>{props.price}</Text>
                    <Text style={Style.text}> {props.descrition}</Text>
                </View>
                <Text style={Style.text}><Text>Qtd </Text>{getQtd[props.title] || 0}</Text>
                <View style={[Style.row, Style.card]}>
                    <View style={[Style.column]}>
                        <ButtonCuston onPress={add} placeholder='+' />
                    </View>
                    <View style={Style.column}>
                        <ButtonCuston onPress={remove} placeholder='-' />
                    </View>
                </View>
                <ButtonCuston onPress={addToCart} placeholder='Adicionar ao carrinho' />
                <ButtonCuston onPress={removeFromCart} placeholder='Remover do carrinho' />
                <View>
                    <Text>Itens no carrinho: {totalItemsInCart}</Text>
                </View>
            </View>
        </View>
    )
}

export const ProductDetails = (props) => {
    return (<View style={Style.row}>
        <View style={[Style.row, Style.cardImg]}>
            <ImageCuston img={props.img} />
        </View>
        <View style={[Style.row, Style.card]}>
            <Text style={Style.title}><Text>R$ </Text>{props.price} </Text>
            <Text style={Style.title}>{props.descrition}</Text>
        </View>
        <View style={Style.row}><Text style={Style.text}>{props.descritionAll}</Text></View>
    </View>)
}
