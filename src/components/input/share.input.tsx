import { APP_COLOR } from "@/utils/constant";
import { useState } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const styles = StyleSheet.create({
    inputGroup: {
        padding: 5,
        gap: 10,
        marginVertical: 5
    },
    text: {
        fontSize: 18
    },
    input: {
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    eye: {
        position: 'absolute',
        right: 15,
        top: 13,
    }

})

type AutoCapitalizeType = 'none' | 'sentences' | 'words' | 'characters' | undefined;

interface IProps {
    title: string;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    value: any;
    placeholder?: string,
    setValue?: (v: any) => void;
    onChangeText?: any;
    onBlur?: any;
    error?: any;
    editable?: boolean;
    touched?: any;
    autoCapitalize?: AutoCapitalizeType;
}

const ShareInput = (props: IProps) => {
    const { title, keyboardType, secureTextEntry, value, setValue, placeholder, onChangeText, onBlur, error, editable = true, touched, autoCapitalize = "none" } = props;
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const [isPassword, setIsPassword] = useState<boolean>(false)
    return (
        <View style={[styles.inputGroup, {}]}>
            {title && <Text style={[styles.text, {}]}>{title}</Text>}
            <View>
                <TextInput
                    editable={editable}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => { setIsFocus(true) }}
                    onBlur={(e) => { if (onBlur) onBlur(e); setIsFocus(false) }}
                    keyboardType={keyboardType}
                    style={[
                        styles.input,
                        { borderColor: isFocus ? APP_COLOR.BLUE_NEW : APP_COLOR.GREY }
                    ]}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry && !isPassword}
                    autoCapitalize={autoCapitalize}

                />
                {error && touched && <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>}
                {secureTextEntry &&
                    <FontAwesome5
                        name={isPassword ? "eye" : "eye-slash"}
                        size={24}
                        color="black"
                        style={styles.eye}
                        onPress={() => setIsPassword(!isPassword)}
                    />
                }

            </View>

        </View>
    )
}
export default ShareInput