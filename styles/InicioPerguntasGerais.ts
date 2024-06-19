import { Button, StyleSheet } from 'react-native';

export default StyleSheet.create({
    imageStyle:{
        alignItems: 'center',
        width: 150,
        height: 200,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },

    button: {
        backgroundColor: '#14E2C3',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginTop: 200,
    },

    buttonText: {
        width: 130,
        alignItems: 'center',
        fontFamily: 'inter-bold',
        color: '#032D45',
        fontSize: 18,
        marginLeft: 15,
    },

    textStyleIII: {
        color: '#ffff',
        alignItems: 'center'
    },

    textStyleII: {
        width: 130,
        alignItems: 'center',
        fontFamily: 'inter-bold',
        color: '#032D45',
        fontSize: 50,
        marginLeft: 15,
    },
    
    gradient: {
        flex: 1,
        width: '110%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 70,
    }
});