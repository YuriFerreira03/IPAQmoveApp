import { Button, StyleSheet } from 'react-native';

export default StyleSheet.create({
    localizacao: {
        fontWeight: 'bold',
    },

    gradient: {
        flex: 1,
        width: '110%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 70,
        backgroundColor: '#032D45'
    },

    textI: {
        fontSize: 32,
        color: "white",
        textAlign: "left",
        marginTop: 4,
        fontFamily: "inter-regular",
        marginHorizontal: 20,
        letterSpacing: 1,
        lineHeight: 45,
    },

    textII: {
        fontSize: 32,
        color: "white",
        textAlign: "left",
        marginTop: 20,
        fontFamily: "inter-regular",
        marginHorizontal: 20,
        letterSpacing: 1,
        lineHeight: 45,
    },

    container: {
        
    },

    card: {
        backgroundColor: 'transparent', // Mudei para transparente para se misturar com o fundo gradiente
        borderRadius: 10,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#fff',
        padding: 25,
        marginVertical: 30,
        width: '80%',
        alignItems: 'flex-start',
    },

    textIII: {
        color: '#ffff',
        
    },

    textIV: {
        color: '#ffff',
        fontSize: '10px',
    },

    checkbox: {

    },

    textV: {
        fontSize: 20,
        color: "white",
        textAlign: "left",
        marginTop: 20,
        fontFamily: "inter-regular",
        marginHorizontal: 20,
        letterSpacing: 1,
        lineHeight: 45,
    },

    buttonText: {

    },

    button: {
        backgroundColor: '#14E2C3',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 50,
    },

    textVI:{
        color: '#14E2C3',
    },
});