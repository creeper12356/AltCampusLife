import { List, View } from "@ant-design/react-native";
import { Image, Linking, Text, TouchableOpacity } from "react-native";

const AboutContent = () => {

    return (
        <View>
            <TouchableOpacity onPress={() => {
                Linking.openURL('https://github.com/creeper12356');
            }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Creeper12356</Text>
                    <Image
                        source={{ uri: 'https://foruda.gitee.com/avatar/1724636918468928006/14825193_creeper12356_1724636918.png!avatar100' }}
                        style={{ width: 20, height: 20 }}
                    />
                </View>
            </TouchableOpacity>
        </View>



    );
};
export default AboutContent;