---
layout: post-wide
title: "Clean Code: Chapter 2 - Meaningful Names"
date: 2016-03-04
---

One of the most fundamental aspects of clean, readable code has to do with creating meaningful, sustainable names throughout the code base. *Clean Code* describes several conventions with which to follow, all of which are guidelines, but consider them best practices.

Meaningful names means more than just consistency and readability. Here is a highlight of the concepts covered in Chapter 2 of *Clean Code*:

Convention | Description | Example
--- | --- | ---
Use Intention revealing names | Why does it exist? What does it do? How is it used? | *DO* `fileAgeInDays`
 | |
Avoid disinformation | Don’t use datatypes in names. Avoid abbreviations. Variations should be noticeable. Avoid characters like lower case l and upper case O. | *DON’T* `c`, `l()`, `printWarehouseInfo` and `printWarehousesInfo`
Make meaningful distinctions | Don’t name with number series. Avoid noise words like a, an, the. Naming the object in the name is redundant. | *DON’T* `StudentArray1`, `productData` and `productInfo`
Use pronounceable names | Names should make verbal sense. | *DON’T* `prymdhms` (print date method)
Use searchable names | Avoid single letters or numeric characters | *DON’T* `g`, `8 = “eight”`
Avoid encoding | Don’t use Hungarian notation. Member prefix is usually not necessary. | *DON’T* `m_anything`
Avoid mental mapping | Be clear about intention. Single letters ok within small loop scope |
Class names | Noun or noun phrase | *DO* `Customer`, `AddressParser`
Function names | Verb or verb phrase | *DO* `postPayment`, `getUserInput`
Don’t be Cute | Avoid personal names, inside jokes. There should be clear intention. | *DON’T* `eatMyShorts()`
Pick one word per concept | Code should be consistent when actions appear elsewhere in code | *DON’T* `get` and `receive` and `fetch`
Don’t pun | When the same word can be used for functions that act differently, use different verbs. | *DO* `add` vs `append`
Use solution domain names | CS terms are ok. | *DO* `JobQueue`
Use problem domain names | Separate solution and problem names |
Add meaningful context | Break up larger functions or add a new class. Prefix variables if necessary for clarity. | *DO* `addrStreet`, `addrState`
Don’t add gratuitous content | Don’t prefix if intent is clear or broader scope applies. Short names are better than long if they are clear | *DON’T* `accountAddress`