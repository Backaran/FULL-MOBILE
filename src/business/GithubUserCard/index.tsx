import { Text, Alert, View, Pressable } from 'react-native';
import { GithubUser } from '../../services/github';
import { openURL } from '../../utils/linking';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import styles from './styles';
import { useCallback } from 'react';
import CheckboxInput, { CheckboxInputState } from '../../components/Inputs/CheckboxInput';

type GithubUserCardProps = {
  data: GithubUser;
  editMode: boolean;
  selected: boolean;
  onPress?: () => void;
};

const GithubUserCard = ({ data, editMode, selected, onPress }: GithubUserCardProps) => {
  const showProfile = useCallback(async () => {
    const result: boolean = await openURL(data.html_url);
    if (!result) {
      Alert.alert('Error', 'Impossible to open link !');
    }
  }, [data.html_url]);

  return (
    <Pressable disabled={!editMode} onPress={onPress}>
      <Card>
        {editMode && (
          <View style={styles.selectionContainer}>
            <CheckboxInput
              value={selected ? CheckboxInputState.Selected : CheckboxInputState.Unselected}
            />
          </View>
        )}
        <Avatar url={data.avatar_url} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{data.id}</Text>
          <Text style={styles.text}>{data.login}</Text>
        </View>
        <Button title="View profile" onPress={showProfile} />
      </Card>
    </Pressable>
  );
};

export default GithubUserCard;
