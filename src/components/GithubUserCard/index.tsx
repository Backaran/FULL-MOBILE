import { Text, View, Button, Image, Alert } from 'react-native';
import { GithubUser } from '../../services/github';
import { openURL } from '../../utils/linking';

type GithubUserCardProps = {
  data: GithubUser;
  editMode: boolean;
}

const GithubUserCard = ({
  data,
  editMode,
}: GithubUserCardProps) => {

  const showProfile = async () => {
    const result: boolean = await openURL(data.html_url);
    if (!result) {
      Alert.alert('Error', 'Impossible to open link !');
    }
  };

  return (
    <View>
      <Image source={{ uri: data.avatar_url }} />
      <Text>{editMode}</Text>
      <Text>{data.id}</Text>
      <Text>{data.login}</Text>
      <Button
        title="View Profile"
        onPress={showProfile}
      />
    </View>
  );
}

export default GithubUserCard;
