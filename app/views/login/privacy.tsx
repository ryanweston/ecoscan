import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import {
  Container, Subtitle, Body, Title,
} from '@/components';
import { withTheme } from '@/theme/theme-context';
import { ITheme, IThemeProp } from '@/types';

interface Props {
  themeProp: IThemeProp
}

const createStyles = (theme: ITheme) => StyleSheet.create({
  section: {
    marginTop: theme.tokens.gap,
  },
});

function Privacy({ themeProp }: Props) {
  const { theme } = themeProp;
  const styles = React.useMemo(
    () => createStyles(theme),
    [theme],
  );

  return (
    <ScrollView>
      <Container>
        <Title>Privacy Policy</Title>
        <Body>
          EcoScan is a mock company. This privacy policy will explain how our organization uses
          the personal data we collect from you when you use our application.
        </Body>
        <View style={styles.section}>
          <Subtitle>Topics:</Subtitle>
          <Body>
            What data do we collect?
            How do we collect your data?
            How will we use your data?
            How do we store your data?
            Marketing
            What are your data protection rights?
            How to manage your cookies
            Privacy policies of other websites
            Changes to our privacy policy
            How to contact us
            How to contact the appropriate authorities
          </Body>
        </View>

        <View style={styles.section}>
          <Subtitle>What data do we collect?</Subtitle>
          <Body>
            EcoScan will only collect your email address provided to us through
            your Google sign in.

            How do we collect your data?
            You directly provide EcoScan with most of the data we collect.
            We collect data and process data when you: First register on our
            application. We then associate reviews you submit with your email address.

            How do we store your data?
            EcoScan securely stores your data on our Heroku server.

            EcoScan will keep your email address until your account has been deleted, or revoked.
            If you choose to delete or revoke access, we will delete your data by permanently
            removing your information from our database and no backups will be made.
            We reserve the right to store and continue to use your reviews when your account
            is deleted or revoked. However, all account related & personal information will be
            removed, making the review be anonymous.
          </Body>
        </View>

        <View style={styles.section}>
          <Subtitle>Marketing</Subtitle>
          <Body>

            We will not use any of your data for marketing purposes. This is subject to change.
            You have the right at any time to stop EcoScan from contacting you for marketing
            purposes or giving your data to other members of the EcoScan.
          </Body>
        </View>
        <View style={styles.section}>
          <Subtitle>What are your data protection rights?</Subtitle>
          <Body>
            EcoScan would like to make sure you are fully aware of all of your data protection
            rights. Every user is entitled to the following:

            The right to access – You have the right to request EcoScan for copies of your
            personal data. We may charge you a small fee for this service.

            The right to rectification – You have the right to request that EcoScan correct
            any information you believe is inaccurate. You also have the right to request EcoScan
            to complete the information you believe is incomplete.

            The right to erasure – You have the right to request that EcoScan erase
            your personal data, under certain conditions.

            The right to restrict processing – You have the right to request that EcoScan
            restrict the processing of your personal data, under certain conditions.

            The right to object to processing – You have the right to object to EcoScan’s
            processing of your personal data, under certain conditions.

            The right to data portability – You have the right to request that EcoScan
            transfer the data that we have collected to another organization, or directly
            to you, under certain conditions.

            If you make a request, we have one month to respond to you. If you would
            like to exercise any of these rights, please contact us at our email:
            ryan.ede@students.plymouth.ac.uk
          </Body>
        </View>

        <View style={styles.section}>
          <Subtitle>Privacy policies of other websites</Subtitle>
          <Body>
            The EcoScan website contains links to other websites.
            Our privacy policy applies only to our website, so if you click on a link to another
            website, you should read their privacy policy.
          </Body>
        </View>

        <View style={styles.section}>
          <Subtitle>Changes to our privacy policy</Subtitle>
          <Body>
            EcoScan keeps its privacy policy under regular review and places any updates on
            this web page. This privacy policy was last updated on 9 January 2019.
          </Body>
        </View>

        <View style={styles.section}>
          <Subtitle>How to contact us</Subtitle>
          <Body>
            If you have any questions about EcoScan’s privacy policy, the data we hold on you,
            or you would like to exercise one of your data protection rights, please do not
            hesitate to contact us. Email us at: ryan.ede@students.plymouth.ac.uk

            Call us at: +4400000000

            Or write to us:
            Fake address, Fake Address, PL5 FAKE

            How to contact the appropriate authority
            Should you wish to report a complaint or if you feel that EcoScan has not addressed
            your concern in a satisfactory manner, you may contact the Information Commissioner’s
            Office.

            Phone number: 0303 123 1113

            Website: https://ico.org.uk/global/contact-us/

          </Body>
        </View>
      </Container>
    </ScrollView>
  );
}

export default withTheme(Privacy);
