# metadata-xml-tool

> CLI tool for processing Salesforce Metadata XML files

[![Build Status](https://travis-ci.org/amtrack/metadata-xml-tool.svg?branch=master)](https://travis-ci.org/amtrack/metadata-xml-tool)

## Installation

```console
$ npm install -g metadata-xml-tool
```

## Usage

```text
metadata-xml-tool.

Usage:
        metadata-xml-tool [options] <command>

Commands:
        remove-element <element> [file]...
        remove-element-matching <element> <expression> [file]...
        replace-tag-value <tag> <expression> <new_value> [file]...

Options:
        -h --help       Show help
```

## Examples

`$ metadata-xml-tool remove-element validationRules src/objects/Account.object`

```diff
diff --git a/src/objects/Account.object b/src/objects/Account.object
index 9324e0b..3b2a9ff 100644
--- a/src/objects/Account.object
+++ b/src/objects/Account.object
@@ -478,23 +478,6 @@
         <searchResultsAdditionalFields>CORE.USERS.ALIAS</searchResultsAdditionalFields>
     </searchLayouts>
     <sharingModel>ReadWrite</sharingModel>
-    <validationRules>
-        <fullName>VAT_Number_10</fullName>
-        <active>true</active>
-        <errorConditionFormula>LEN(VAT_Number__c) &lt; 10</errorConditionFormula>
-        <errorDisplayField>VAT_Number__c</errorDisplayField>
-        <errorMessage>VAT Number must be 10 characters</errorMessage>
-    </validationRules>
-    <validationRules>
-        <fullName>Test_Min_5_Max_10</fullName>
-        <active>true</active>
-        <errorConditionFormula>OR(
-            LEN(Test__c) &lt; 5,
-            LEN(Test__c) &gt; 10
-        )</errorConditionFormula>
-        <errorDisplayField>Test__c</errorDisplayField>
-        <errorMessage>Test__c should be between 5 and 10 characters long</errorMessage>
-    </validationRules>
     <webLinks>
         <fullName>AltavistaNews</fullName>
         <availability>online</availability>
```

`$ metadata-xml-tool remove-element-matching listViews "<fullName>Ideas_Last_7_Days</fullName>" src/objects/Idea.object`

```diff
diff --git a/src/objects/Idea.object b/src/objects/Idea.object
index 7a272cf..e2c9c0d 100644
--- a/src/objects/Idea.object
+++ b/src/objects/Idea.object
@@ -32,25 +32,6 @@
         </picklist>
         <type>Picklist</type>
     </fields>
-    <listViews>
-        <fullName>Ideas_Last_7_Days</fullName>
-        <columns>IDEA.CREATED_DATE</columns>
-        <columns>IDEA.TITLE</columns>
-        <columns>IDEA.CREATED_BY_NICKNAME</columns>
-        <columns>VOTE_STATS.WEIGHTED_SUM</columns>
-        <columns>IDEA.NUM_COMMENTS</columns>
-        <columns>IDEA.STATUS</columns>
-        <columns>IDEA.CATEGORIES</columns>
-        <columns>COMMUNITY.NAME</columns>
-        <columns>IDEA.IDEA_THEME</columns>
-        <filterScope>Everything</filterScope>
-        <filters>
-            <field>IDEA.CREATED_DATE</field>
-            <operation>equals</operation>
-            <value>LAST_N_DAYS:7</value>
-        </filters>
-        <label>Last 7 Days</label>
-    </listViews>
     <recordTypes>
         <fullName>InternalIdeasIdeaRecordType</fullName>
         <active>true</active>
```

`$ metadata-xml-tool remove-element-matching userPermissions "<name>ManageEncryptionKeys</name>" src/profiles/Admin.profile`

```diff
diff --git a/src/profiles/Admin.profile b/src/profiles/Admin.profile
index e7939c7..33ca7e1 100644
--- a/src/profiles/Admin.profile
+++ b/src/profiles/Admin.profile
@@ -2596,8 +2596,4 @@
         <enabled>true</enabled>
         <name>ViewSetup</name>
     </userPermissions>
-    <userPermissions>
-        <enabled>true</enabled>
-        <name>ManageEncryptionKeys</name>
-    </userPermissions>
 </Profile>
```

`$ metadata-xml-tool replace-tag-value runningUser ".*" "user@example.com" src/dashboards/CompanyDashboards/AdoptionDashboard.dashboard`

```diff
diff --git a/src/dashboards/CompanyDashboards/AdoptionDashboard.dashboard b/src/dashboards/CompanyDashboards/AdoptionDashboard.dashboard
index 916f693..7c3c3ef 100644
--- a/src/dashboards/CompanyDashboards/AdoptionDashboard.dashboard
+++ b/src/dashboards/CompanyDashboards/AdoptionDashboard.dashboard
@@ -283,7 +283,7 @@
             <useReportChart>false</useReportChart>
         </components>
     </rightSection>
-    <runningUser>admin@universal.containers</runningUser>
+    <runningUser>user@example.com</runningUser>
     <textColor>#000000</textColor>
     <title>Adoption Dashboard</title>
     <titleColor>#000099</titleColor>
```

## Sponsors

* [IPfolio](http://www.ipfolio.com)
* [PARX](http://www.parx.com)

## License

MIT © [Matthias Rolke](mailto:mr.amtrack@gmail.com)
