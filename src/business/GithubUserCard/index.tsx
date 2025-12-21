import React from 'react';
import { Text, View } from 'react-native';
import { GithubUser } from '../../store/Github/reducer';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';
import styles from './styles';
import useLinking from '../../hooks/useLinking';

interface GithubUserCardProps {
  /** data to be displayed */
  data: GithubUser;
  /** if card can be selected */
  editMode: boolean;
  /** if card is selected */
  selected: boolean;
  /** action when card is pressed */
  onToggle?: () => void;
};

/**
 * Used to a display a card for GithubUser
 * @param data data to be displayed
 * @param editMode if card can be selected
 * @param selected if card is selected
 * @param onPress action when card is selected
 * @returns component
 */
const GithubUserCard = ({
  data,
  editMode,
  selected,
  onToggle
}: GithubUserCardProps) => {
  const { openUrl } = useLinking();

  return (
    <Card
      editMode={editMode}
      selected={selected}
      onPress={editMode ? onToggle : undefined}
    >
      <Avatar url={data.avatar_url} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{data.originalId}</Text>
        <Text style={styles.text}>{data.login}</Text>
      </View>
      <Button
        title="View profile"
        onPress={() => openUrl(data.html_url)}
      />
    </Card>
  );
};

export default React.memo(GithubUserCard);
