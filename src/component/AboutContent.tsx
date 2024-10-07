import { List, View } from "@ant-design/react-native";
import { Image, Linking, Text, TouchableOpacity } from "react-native";

const AboutContent = () => {
    const version = 'v1.0.1';
    return (
        <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>AltCampusLife</Text>
                <Text>{version}</Text>
                <Text style={{ color: 'steelblue', borderBottomWidth: 1, borderColor: 'steelblue' }}
                    onPress={() => {
                        Linking.openURL('https://github.com/creeper12356/AltCampusLife');
                    }}>源代码</Text>
            </View>
        </View>



    );
};
export default AboutContent;