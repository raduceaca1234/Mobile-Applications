package com.example.myapplication

import android.content.Intent
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.widget.AdapterView
import android.widget.AdapterView.OnItemClickListener
import android.widget.ListView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import com.google.android.material.floatingactionbutton.FloatingActionButton

class MainActivity : AppCompatActivity(), OnItemClickListener {
    var listView: ListView? = null
    var helper: DBHelper? = null
    protected override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        val toolbar: Toolbar = findViewById(R.id.toolbar) as Toolbar
        setSupportActionBar(toolbar)
        val fab: FloatingActionButton = findViewById(R.id.fab) as FloatingActionButton
        fab.setOnClickListener(View.OnClickListener {
            startActivity(
                Intent(
                    this@MainActivity,
                    AddActivity::class.java
                )
            )
        })
        helper = DBHelper(this)
        listView = findViewById(R.id.list_notes) as ListView?
        listView!!.onItemClickListener = this
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        val id = item.itemId
        return if (id == R.id.action_settings) {
            true
        } else super.onOptionsItemSelected(item)
    }

    fun setListView() {
        val cursor = helper!!.allData()
        val customCursorAdapter = CustomCursorAdapter(this, cursor, 1)
        listView!!.adapter = customCursorAdapter
    }

    override fun onItemClick(
        parent: AdapterView<*>?,
        view: View,
        i: Int,
        x: Long
    ) {
        val getId = view.findViewById<View>(R.id.listID) as TextView
        val id = getId.text.toString().toLong()
        val cur = helper!!.oneData(id)
        cur.moveToFirst()
        val idnotes = Intent(this@MainActivity, EditActivity::class.java)
        idnotes.putExtra(DBHelper.row_id, id)
        startActivity(idnotes)
    }

    protected override fun onResume() {
        super.onResume()
        setListView()
    }
}